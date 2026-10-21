// 从 Unity 工程重新生成 BGM 播放器的数据（playlist/ 目录）：
//   bgm_items.json   曲目表，id/path 以游戏为准，name/author 是人工整理的，原样保留
//   Playlist_*.json  游戏里的歌单
//   locations.json   各地点放的曲目
// 最后列出需要手动上传到 R2 的音频（脚本不上传）。
//
//   node scripts/build-bgm.mts --unity D:/UnityProjects/Elin
//
// 地点的规则照 Zone.cs：有固定地图（Package/_Elona/Map/<idExport>.z）时用地图里的 _plDay，
// 为空再取 IDPlayList 歌单，都没有就不放 BGM；随机生成的地图取 IDPlayList，为空落到 Day。
// 子类改写的 idExport / GetNewZoneID / IDPlaylistOverwrite 抄在下面几张表里，游戏更新后要回来核对。

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { inflateRawSync } from "node:zlib";

// 不进地点列表的 SourceZone 行（另外 closed / debug 标签的行也跳过：不能进入或不在世界地图上）
// prettier-ignore
const SKIP_ZONES = new Set([
  // 开发、测试
  "startVillage", "startVillage3", "testroom", "testroom2", "testroom3", "testMap",
  // 占位，不在世界地图上；user 的曲目随用户地图
  "world", "asseria", "elin_valley", "elin_snow", "elin_plain", "elin_plain2", "elin_plain3",
  "hospital", "somewhere", "wilds", "user", "startCave", "academy_roran",
  // 进入时由任务事件换 BGM（ZoneEventSubdue / ZoneEventHarvest）
  "instance_arena2", "instance_harvest",
  // Zone_Nymelle 的 Boss 层与水晶层，归在 nymelle 名下
  "nymelle_boss", "nymelle_crystal",
]);

// 往下走时换用另一行 SourceZone 的区域（GetNewZoneID）：区域 → [起始层, 子区域]
const SUB_ZONES: Record<string, [number, string]> = {
  vernis: [-1, "vernis_mine"],
  oldkeep: [-1, "oldkeep_dungeon"],
  curryruin: [-1, "curryruin_dungeon"],
  cursed_manor: [-2, "cursed_manor_dungeon"],
};

// 子类按层改写 idExport 的地图：区域 → [层, 地图, 该层用的 SourceZone 行]
const LEVEL_MAPS: Record<string, [number, string, string?][]> = {
  field: [[0, "bridge"]],
  temple_undersea: [[-5, "lurie_boss"]],
  nymelle: [
    [-5, "nymelle_boss", "nymelle_boss"],
    [-6, "nymelle_crystal", "nymelle_crystal"],
  ],
  vernis_mine: [[-8, "vernis_mine_boss"]],
  oldkeep_dungeon: [[-5, "curry_boss"]],
  curryruin_dungeon: [[-5, "curry_boss"]],
  cursed_manor_dungeon: [[-6, "cursed_manor_boss"]],
  cave_dead: [[-6, "boss_dead"]],
};

// 随机地下城（Zone_RandomDungeon）在 lv == LvBoss 时换 Dungeon_Boss。LvBoss 默认是 -2 - rnd(4)，
// 即 B2–B5F 里随机一层，MinLv => LvBoss 所以也是最底层；子类写死的 LvBoss（Zone_CaveMonster、
// Zone_Gathering）与各类的 StartLV 由脚本从 Zone.cs 读出
const RANDOM_BOSS_LV: [number, number] = [-2, -5];
// Zone_Void.IsBossLV：层数是 5 的倍数且是当前最深层
const VOID_BOSS_LV = [-5, -10];

// 节日（IDPlaylistOverwrite），名字照 WidgetDate 写成「区域 (<idExport>_festival)」
const FESTIVALS: Record<string, string> = {
  kapul: "Festival_Noyel",
  yowyn: "Festival_Yowyn",
  noyel: "Festival_Noyel",
  olvina: "Festival_Olvina",
};

// 不生成的游戏歌单：Dungeon bk 是 Dungeon 的备份，Lot 是房间自选 BGM 的占位
const SKIP_PLAYLISTS = new Set(["Dungeon bk", "Lot"]);

const R2 = "https://r2.assets.elin-modding.net/Sound/BGM/";

const argv = process.argv.slice(2);
const unity = argv[argv.indexOf("--unity") + 1];
if (!argv.includes("--unity") || !unity) {
  console.error("usage: node scripts/build-bgm.mts --unity <Unity 工程目录>");
  process.exit(1);
}

const ASSETS = path.join(unity, "Assets");
const BGM_DIR = path.join(ASSETS, "Resources/Media/Sound/BGM");
const MAP_DIR = path.join(ASSETS, "StreamingAssets/Package/_Elona/Map");
const CN_DIR = path.join(ASSETS, "StreamingAssets/Package/_Lang_Chinese/Lang/CN/Game");
const OUT = path.join(import.meta.dirname, "..", "playlist");

type Names = { en: string; ja: string; zh: string };
type Item = { id: number; name: string; path: string; author: string };
type Location = { id: string; name: Names; entries: number[]; playlist?: string };
type Row = Record<string, string | string[]>;

// ── 读文件 ──────────────────────────────────────────────────────────────

// 行尾跟着工作区里现有的文件走（Windows 上 autocrlf 检出的是 CRLF），免得 git status 里一片空改动
const oldItemsText = readFileSync(path.join(OUT, "bgm_items.json"), "utf8");
const EOL = oldItemsText.includes("\r\n") ? "\r\n" : "\n";

function writeJson(file: string, data: unknown) {
  writeFileSync(path.join(OUT, file), JSON.stringify(data, null, 2).replaceAll("\n", EOL));
}

// Unity YAML 的标量：双引号串的转义与 JSON 相同，单引号串用 '' 表示 '
function scalar(s: string) {
  s = s.trim();
  if (s.startsWith('"')) return JSON.parse(s) as string;
  if (s.startsWith("'")) return s.slice(1, -1).replaceAll("''", "'");
  return s;
}

// Source 表（SourceZone / LangGeneral）的 rows；值保留原文，用到时再 scalar()
function readRows(file: string): Row[] {
  return readFileSync(file, "utf8")
    .split("\n  - _index: ")
    .slice(1)
    .map((block) => {
      const row: Row = {};
      let key = "";
      for (const line of block.split(/\r?\n/)) {
        const item = /^ {4}- (.*)$/.exec(line);
        if (item && key) {
          if (!Array.isArray(row[key])) row[key] = [];
          (row[key] as string[]).push(scalar(item[1]));
          continue;
        }
        const kv = /^ {4}(\w+):\s?(.*)$/.exec(line);
        if (kv) row[(key = kv[1])] = kv[2] === "[]" ? [] : kv[2];
      }
      return row;
    });
}

const str = (row: Row, key: string) => scalar((row[key] as string) ?? "");
const list = (row: Row, key: string) => (Array.isArray(row[key]) ? row[key] : []) as string[];

// .meta 里的 guid → 资产路径
function guidMap(dir: string) {
  const map = new Map<string, string>();
  for (const f of readdirSync(dir, { recursive: true }) as string[]) {
    if (!f.endsWith(".meta")) continue;
    const guid = /^guid: (\w+)/m.exec(readFileSync(path.join(dir, f), "utf8"))?.[1];
    if (guid) map.set(guid, path.join(dir, f.slice(0, -5)));
  }
  return map;
}

const scriptGuid = (cs: string) =>
  /^guid: (\w+)/m.exec(
    readFileSync(path.join(ASSETS, "Plugins/Essential/Sound", `${cs}.meta`), "utf8"),
  )![1];

// zip（地图 .z 与 .xlsx）：按中央目录取条目
function readZip(file: string) {
  const buf = readFileSync(file);
  let eocd = buf.length - 22;
  while (buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  const entries = new Map<string, Buffer>();
  for (let i = 0, p = buf.readUInt32LE(eocd + 16); i < buf.readUInt16LE(eocd + 10); i++) {
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const local = buf.readUInt32LE(p + 42);
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const data = buf.subarray(start, start + size);
    entries.set(
      buf.toString("utf8", p + 46, p + 46 + nameLen),
      buf.readUInt16LE(p + 10) ? inflateRawSync(data) : data,
    );
    p += 46 + nameLen + buf.readUInt16LE(p + 30) + buf.readUInt16LE(p + 32);
  }
  return entries;
}

// 地图 JSON 有的用 LZ4Stream（lz4net）压过：一串 chunk，各自是 varint 标志/原长/压缩长 + LZ4 块
function lz4Stream(buf: Buffer) {
  const parts: Buffer[] = [];
  let p = 0;
  const varint = () => {
    let n = 0;
    for (let shift = 1, b = 0x80; b & 0x80; shift *= 128) n += ((b = buf[p++]) & 0x7f) * shift;
    return n;
  };
  while (p < buf.length) {
    const flags = varint();
    const size = varint();
    const packed = flags & 1 ? varint() : size;
    const src = buf.subarray(p, (p += packed));
    if (!(flags & 1)) {
      parts.push(src);
      continue;
    }
    const out = Buffer.alloc(size);
    for (let i = 0, o = 0; i < src.length; ) {
      const token = src[i++];
      let n = token >> 4;
      if (n === 15) for (let b = 255; b === 255; n += b) b = src[i++];
      src.copy(out, o, i, (i += n));
      o += n;
      if (i >= src.length) break;
      const offset = src[i] | (src[i + 1] << 8);
      i += 2;
      n = token & 15;
      if (n === 15) for (let b = 255; b === 255; n += b) b = src[i++];
      for (const end = o + n + 4; o < end; o++) out[o] = out[o - offset];
    }
    parts.push(out);
  }
  return Buffer.concat(parts);
}

// 同 IO.IsCompressed：首个非空白字符不像 JSON 就是压缩过的
function isCompressed(buf: Buffer) {
  const c = String.fromCharCode(
    buf.find((b) => !" \t\r\n".includes(String.fromCharCode(b))) ?? 0x7b,
  );
  return !/[{["tfn\-0-9]/.test(c);
}

const unxml = (s: string) =>
  s.replace(
    /&(lt|gt|quot|apos|amp);/g,
    (_, e) => ({ lt: "<", gt: ">", quot: '"', apos: "'", amp: "&" })[e as string]!,
  );

// xlsx 第一张表 → 以首行为表头的对象数组
function readSheet(file: string) {
  const zip = readZip(file);
  const text = (xml: string) =>
    [...xml.matchAll(/<t[^>]*>([^<]*)<\/t>/g)].map((m) => unxml(m[1])).join("");
  const shared = [
    ...(zip.get("xl/sharedStrings.xml")?.toString() ?? "").matchAll(/<si>([\s\S]*?)<\/si>/g),
  ].map((m) => text(m[1]));
  const sheet = [...zip.keys()].find((k) => k.startsWith("xl/worksheets/") && k.endsWith(".xml"))!;
  const rows = [
    ...zip
      .get(sheet)!
      .toString()
      .matchAll(/<row[^>]*?(?:\/>|>([\s\S]*?)<\/row>)/g),
  ].map((m) => {
    const cells: string[] = [];
    for (const c of (m[1] ?? "").matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const col = [...c[1]].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1;
      const type = /t="(\w+)"/.exec(c[2])?.[1];
      const v = /<v>([^<]*)<\/v>/.exec(c[3] ?? "")?.[1];
      cells[col] =
        type === "s" ? shared[+v!] : type === "inlineStr" ? text(c[3] ?? "") : unxml(v ?? "");
    }
    return cells;
  });
  const head = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

// ── 曲目 ────────────────────────────────────────────────────────────────

const assets = guidMap(BGM_DIR);
const BGM_SCRIPT = scriptGuid("BGMData.cs");
const PLAYLIST_SCRIPT = scriptGuid("Playlist.cs");
const field = (yaml: string, key: string) =>
  new RegExp(`^  ${key}: (.*)$`, "m").exec(yaml)?.[1] ?? "";
const refGuid = (yaml: string, key: string) => /guid: (\w+)/.exec(field(yaml, key))?.[1];

// BGMData 资产（Resources.LoadAll 会递归子目录；id 0 是 None / mold / 乐器）
const bgmByGuid = new Map<string, { id: number; name: string; clip: string }>();
for (const [guid, file] of assets) {
  if (!file.endsWith(".asset")) continue;
  const yaml = readFileSync(file, "utf8");
  if (refGuid(yaml, "m_Script") !== BGM_SCRIPT) continue;
  const id = +field(yaml, "id");
  if (!id) continue;
  const clip = assets.get(refGuid(yaml, "clip") ?? "");
  if (!clip) {
    console.warn(`! BGM ${id} 找不到剪辑：${path.basename(file)}`);
    continue;
  }
  bgmByGuid.set(guid, { id, name: scalar(field(yaml, "_name")), clip });
}
const bgms = [...bgmByGuid.values()].sort((a, b) => a.id - b.id);

const oldItems = JSON.parse(oldItemsText) as Item[];
const oldById = new Map(oldItems.map((i) => [i.id, i]));
const items: Item[] = bgms.map(({ id, name, clip }) => {
  const old = oldById.get(id);
  return { id, name: old?.name ?? name, path: path.basename(clip), author: old?.author ?? "" };
});
writeJson("bgm_items.json", items);

const ids = new Set(items.map((i) => i.id));
const added = items.filter((i) => !oldById.has(i.id));
const removed = oldItems.filter((i) => !ids.has(i.id));
const moved = items.filter((i) => oldById.has(i.id) && oldById.get(i.id)!.path !== i.path);

// ── 游戏歌单 ────────────────────────────────────────────────────────────

const playlists = new Map<string, number[]>();
for (const f of readdirSync(path.join(BGM_DIR, "Playlist"))) {
  if (!f.startsWith("Playlist_") || !f.endsWith(".asset")) continue;
  const yaml = readFileSync(path.join(BGM_DIR, "Playlist", f), "utf8");
  if (refGuid(yaml, "m_Script") !== PLAYLIST_SCRIPT) continue;
  const entries = [...yaml.matchAll(/^ {2}- data: \{[^}]*guid: (\w+)/gm)].flatMap((m) => {
    const bgm = bgmByGuid.get(m[1]);
    if (!bgm) console.warn(`! ${f} 引用了不认识的 BGMData：${m[1]}`);
    return bgm ? [bgm.id] : [];
  });
  playlists.set(f.slice("Playlist_".length, -".asset".length), entries);
}

const writtenPlaylists: string[] = [];
for (const [name, entries] of playlists) {
  const file = `Playlist_${name}.json`;
  if (entries.length && !SKIP_PLAYLISTS.has(name)) {
    writeJson(file, { name, entries });
    writtenPlaylists.push(name);
  } else if (existsSync(path.join(OUT, file))) {
    unlinkSync(path.join(OUT, file));
    console.log(`删除 ${file}（游戏里为空或不收录）`);
  }
}

// ── 地点 ────────────────────────────────────────────────────────────────

// Zone 子类的继承关系，以及各类写成常量的 StartLV / LvBoss（Zone_Dungeon 从 -1 层开始）
const zoneClasses = new Map<string, { base: string; ints: Map<string, number> }>();
for (const cs of ["Resources/World/Zone/Zone.cs", "Resources/World/Region.cs"]) {
  const text = readFileSync(path.join(ASSETS, cs), "utf8");
  const decls = [...text.matchAll(/^public (?:partial )?class (\w+)\s*:\s*(\w+)/gm)];
  decls.forEach((m, i) => {
    const body = text.slice(m.index, decls[i + 1]?.index);
    const ints = body.matchAll(
      /public (?:const |override |virtual )?int (StartLV|LvBoss)\s*(?:=>|=)\s*(-?\d+);/g,
    );
    zoneClasses.set(m[1], { base: m[2], ints: new Map([...ints].map((x) => [x[1], +x[2]])) });
  });
}
const isA = (type: string, base: string): boolean =>
  type === base || (zoneClasses.has(type) && isA(zoneClasses.get(type)!.base, base));
const classInt = (type: string, key: string): number | undefined =>
  zoneClasses.get(type)?.ints.get(key) ??
  (zoneClasses.has(type) ? classInt(zoneClasses.get(type)!.base, key) : undefined);

const zones = readRows(path.join(ASSETS, "Resources/Data/Export/SourceZone.asset"));
const zoneById = new Map(zones.map((z) => [str(z, "id"), z]));
const zhZone = new Map(
  readSheet(path.join(CN_DIR, "Zone.xlsx"))
    .reverse()
    .map((r) => [r.id, r.name]),
);

const lang = new Map(
  readRows(path.join(ASSETS, "Plugins/BaseCore/DB/Export/LangGeneral.asset")).map((r) => [
    str(r, "id"),
    r,
  ]),
);
const zhLang = new Map(
  readSheet(path.join(CN_DIR, "General.xlsx"))
    .reverse()
    .map((r) => [r.id, r.text]),
);
const langText = (id: string): Names => {
  const en = str(lang.get(id)!, "text");
  return { en, ja: str(lang.get(id)!, "text_JP"), zh: zhLang.get(id) || en };
};

const zoneName = (z: Row): Names => ({
  en: str(z, "name"),
  ja: str(z, "name_JP"),
  zh: zhZone.get(str(z, "id")) || str(z, "name"),
});
const mapNames = (n: Names, f: (s: string, l: keyof Names) => string): Names => ({
  en: f(n.en, "en"),
  ja: f(n.ja, "ja"),
  zh: f(n.zh, "zh"),
});

// Zone.TextLevel：地上显示 lv+1（"#1F"），地下是 "B#1F"；连续几层压成一段，如 B1–4F、地下1–4階
const LEVEL = { up: langText("zoneLevel"), down: langText("zoneLevelB") };
const levelText = (l: keyof Names, hi: number, lo = hi) => {
  const [a, b] = lo >= 0 ? [lo + 1, hi + 1] : [-hi, -lo];
  return (lo >= 0 ? LEVEL.up : LEVEL.down)[l].replace("#1", a === b ? `${a}` : `${a}–${b}`);
};
const withLevel = (n: Names, hi: number, lo = hi) =>
  hi === 0 && lo === 0 ? n : mapNames(n, (s, l) => `${s} ${levelText(l, hi, lo)}`);
// 不固定在某层的 Boss 层写成「最深」层（zoneLevelMax，游戏里标在地下城名字后面的那个）
const DEEPEST = langText("zoneLevelMax");
const withDeepest = (n: Names, text: (l: keyof Names) => string) =>
  mapNames(n, (s, l) => `${s} ${DEEPEST[l].replace("#1", text(l))}`);

const mapCache = new Map<string, number[] | null>();
function mapPlaylist(id: string) {
  if (mapCache.has(id)) return mapCache.get(id)!;
  const file = path.join(MAP_DIR, `${id}.z`);
  let pl: number[] | null = null;
  if (existsSync(file)) {
    let buf = readZip(file).get("map")!;
    if (isCompressed(buf)) buf = lz4Stream(buf);
    pl =
      (JSON.parse(buf.toString("utf8").replace(/^\uFEFF/, ""))._plDay as number[] | undefined) ??
      [];
  }
  mapCache.set(id, pl);
  return pl;
}

// Zone.IDPlayList：source.idPlaylist，为空时非 0 层落到 Underground
const idPlayList = (z: Row, lv: number) => str(z, "idPlaylist") || (lv !== 0 ? "Underground" : "");
const fromPlaylist = (id: string, name: Names, pl: string): Location => ({
  id,
  name,
  entries: playlists.get(pl)!,
  playlist: pl,
});

// 固定地图：地图的 _plDay 优先，空则取 IDPlayList（Zone.RefreshPlaylist，没有 Day 兜底）；
// 不存在的曲目 ModUtil.CreatePlaylist 会跳过
function fixedLocation(id: string, z: Row, map: string, lv: number, name: Names): Location {
  const own = mapPlaylist(map)!;
  if (own.length) {
    const bad = own.filter((i) => !ids.has(i));
    if (bad.length) console.warn(`! ${map}.z 引用了不存在的曲目：${bad.join(", ")}`);
    return { id, name, entries: own.filter((i) => ids.has(i)) };
  }
  const pl = idPlayList(z, lv);
  return playlists.has(pl) ? fromPlaylist(id, name, pl) : { id, name, entries: [] };
}

// 随机生成的地图：IDPlayList，没有这个歌单就落到 Day（Zone.Generate）
function generatedLocation(id: string, z: Row, lv: number, name: Names): Location {
  const pl = idPlayList(z, lv);
  return fromPlaylist(id, name, playlists.has(pl) ? pl : "Day");
}

// 按层的地点先记下层号（hi ≥ lo），相邻楼层合并之后再拼名字
type Part = Location & { family?: string; hi?: number; lo?: number };
const parts: Part[] = [];
const level = (loc: Location, family: string, hi: number, lo = hi): Part => ({
  ...loc,
  family,
  hi,
  lo,
});
const usedMaps = new Set<string>();
const skipped: string[] = [];
const bossLevels = (id: string) => (LEVEL_MAPS[id] ?? []).map(([lv]) => lv).filter((lv) => lv < 0);
const levelMaps = (id: string, z: Row) => {
  for (const [lv, map, rowId] of LEVEL_MAPS[id] ?? []) {
    usedMaps.add(map);
    parts.push(
      level(
        fixedLocation(`${id}_F${lv}`, zoneById.get(rowId ?? id)!, map, lv, zoneName(z)),
        id,
        lv,
      ),
    );
  }
};
// 没有固定地图的地下城；有固定 Boss 层时，上面几层写成层号范围
const generatedFloors = (id: string, z: Row, start: number) => {
  const loc = generatedLocation(id, z, start, zoneName(z));
  const boss = bossLevels(id);
  parts.push(boss.length ? level(loc, id, start, Math.max(...boss) + 1) : loc);
};
const subRows = new Set(Object.values(SUB_ZONES).map(([, id]) => id));

for (const z of zones) {
  const id = str(z, "id");
  const tags = list(z, "tag");
  if (SKIP_ZONES.has(id) || subRows.has(id) || tags.includes("closed") || tags.includes("debug")) {
    if (!subRows.has(id)) skipped.push(id);
    continue;
  }
  const name = zoneName(z);
  const type = str(z, "type");
  const file = list(z, "idFile")[0];
  const start = classInt(type, "StartLV") ?? 0;

  if (file && mapPlaylist(file)) {
    usedMaps.add(file);
    parts.push(level(fixedLocation(id, z, file, 0, name), id, 0));
    if (FESTIVALS[id]) {
      const fest = langText(`${file}_festival`);
      const festName = mapNames(name, (s, l) => `${s} (${fest[l]})`);
      parts.push(fromPlaylist(`${id}_festival`, festName, FESTIVALS[id]));
    }
    // 楼层图 <idFile>_F<lv>.z，从地面往外排，合并时才能一层层接上
    const floors = readdirSync(MAP_DIR)
      .map((f) => +(new RegExp(`^${file}_F(-?\\d+)\\.z$`).exec(f)?.[1] ?? NaN))
      .filter((lv) => !isNaN(lv))
      .sort((a, b) => Math.abs(a) - Math.abs(b));
    for (const lv of floors) {
      usedMaps.add(`${file}_F${lv}`);
      parts.push(level(fixedLocation(`${id}_F${lv}`, z, `${file}_F${lv}`, lv, name), id, lv));
    }
  } else if (isA(type, "Zone_RandomDungeon")) {
    const boss = classInt(type, "LvBoss");
    const bossLoc = fromPlaylist(boss === start ? id : `${id}_boss`, name, "Dungeon_Boss");
    if (boss === start) {
      // 只有一层，就是 Boss 层（Zone_CaveMonster、Zone_Gathering）
      parts.push(bossLoc);
    } else if (boss === undefined) {
      parts.push(generatedLocation(id, z, start, name));
      parts.push({ ...bossLoc, name: withDeepest(name, (l) => levelText(l, ...RANDOM_BOSS_LV)) });
    } else {
      parts.push(level(generatedLocation(id, z, start, name), id, start, boss + 1));
      parts.push(level(bossLoc, id, boss));
    }
  } else {
    generatedFloors(id, z, start);
    if (isA(type, "Zone_Void")) {
      const text = (l: keyof Names) =>
        VOID_BOSS_LV.map((lv) => levelText(l, lv)).join(l === "en" ? ", " : "、") + "…";
      parts.push(fromPlaylist(`${id}_boss`, withDeepest(name, text), "Dungeon_Boss"));
    }
  }
  levelMaps(id, z);

  if (SUB_ZONES[id]) {
    const [from, subId] = SUB_ZONES[id];
    const sub = zoneById.get(subId)!;
    generatedFloors(subId, sub, from);
    levelMaps(subId, sub);
  }
}

// 同一地点相邻、曲目相同的层并成一段（Specwing 1–3F）；地上（0 层算 1F）与地下不跨着并
const sameTracks = (a: Location, b: Location) =>
  a.playlist === b.playlist && `${a.entries}` === `${b.entries}`;
const aboveGround = (p: Part) => p.lo! >= 0;
const merged: Part[] = [];
for (const part of parts) {
  const prev =
    part.family === undefined
      ? undefined
      : merged.find(
          (p) =>
            p.family === part.family &&
            aboveGround(p) === aboveGround(part) &&
            Math.max(p.lo!, part.lo!) <= Math.min(p.hi!, part.hi!) + 1 &&
            sameTracks(p, part),
        );
  if (!prev) merged.push({ ...part });
  else [prev.hi, prev.lo] = [Math.max(prev.hi!, part.hi!), Math.min(prev.lo!, part.lo!)];
}
// 同名且曲目相同的只留第一个（tent1 / tent2 两种帐篷、野外与桥）
const locations: Location[] = [];
for (const { family, hi, lo, ...loc } of merged) {
  if (family !== undefined) loc.name = withLevel(loc.name, hi!, lo);
  if (!locations.some((l) => l.name.en === loc.name.en && `${l.entries}` === `${loc.entries}`))
    locations.push(loc);
}
writeJson("locations.json", locations);

// ── 汇总 ────────────────────────────────────────────────────────────────

const label = (id: number) => `${id} ${items.find((i) => i.id === id)?.name ?? "?"}`;
console.log(
  `曲目 ${items.length} 首` + (added.length ? `，新增 ${added.map((i) => i.id).join(", ")}` : ""),
);
if (removed.length)
  console.log(`! 游戏里已没有的曲目：${removed.map((i) => `${i.id} ${i.name}`).join(", ")}`);
if (moved.length)
  console.log(
    `剪辑改名：${moved.map((i) => `${i.id} ${oldById.get(i.id)!.path} → ${i.path}`).join(", ")}`,
  );
console.log(`歌单 ${writtenPlaylists.length} 个：${writtenPlaylists.join(", ")}`);
console.log(`\n地点 ${locations.length} 个：`);
for (const l of locations)
  console.log(
    `  ${l.name.en}${l.playlist ? ` ← ${l.playlist}` : ""}：${l.entries.length ? l.entries.map(label).join(" / ") : "（不放 BGM）"}`,
  );
console.log(`\n跳过的区域：${skipped.join(", ")}`);
const unusedMaps = readdirSync(MAP_DIR)
  .filter((f) => f.endsWith(".z") && !usedMaps.has(f.slice(0, -2)))
  .map((f) => f.slice(0, -2));
console.log(`没有对应地点的地图：${unusedMaps.join(", ")}`);

// ── R2 ──────────────────────────────────────────────────────────────────

const oldPaths = new Set(oldItems.map((i) => i.path));
const md5 = (file: string) => createHash("md5").update(readFileSync(file)).digest("hex");
const clipOf = new Map(bgms.map((b) => [path.basename(b.clip), b.clip]));
const upload: string[] = [];
let offline = false;
let next = 0;
const paths = [...clipOf.keys()];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (next < paths.length && !offline) {
      const p = paths[next++];
      try {
        const res = await fetch(R2 + encodeURIComponent(p), {
          method: "HEAD",
          signal: AbortSignal.timeout(15000),
        });
        const etag = res.headers.get("etag")?.replaceAll('"', "");
        if (res.status === 404) upload.push(`${p}（R2 上没有）`);
        else if (!res.ok) throw new Error(`HTTP ${res.status}`);
        else if (etag !== md5(clipOf.get(p)!)) upload.push(`${p}（与 R2 上的不同）`);
      } catch (e) {
        if (!offline) console.log(`\nR2 检查失败（${(e as Error).message}），跳过`);
        offline = true;
      }
    }
  }),
);
// 连不上 R2 时只能按新曲目列
const toUpload = offline
  ? paths.filter((p) => !oldPaths.has(p)).map((p) => `${p}（新曲目，未核对 R2）`)
  : upload;
if (toUpload.length)
  console.log(`\n需要上传到 R2 Sound/BGM/ 的文件：\n${toUpload.map((u) => `  ${u}`).join("\n")}`);
else if (!offline) console.log("\nR2 上的音频都是最新的");
