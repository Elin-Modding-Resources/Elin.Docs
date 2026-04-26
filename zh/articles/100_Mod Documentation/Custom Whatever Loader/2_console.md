---
title: Console Commands 控制台
date: 2025/5/46 01:00
hide: true
---

## External Console

CWL supports receiving and executing console commands from external tools using named pipes. After game launch, a console pipe server will be opened at `\\.\pipe\Elin\Console`. Writing console commands to this pipe will execute them in game.

## General / 常规

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.spawn` | Test spawn a CWL loaded chara | 测试生成一个已加载CWL角色 |
| `cwl.enable_debug` | Enable debug mode for Elin | 为Elin启用调试模式 |
| `cwl.remove_all` | Remove every chara with ID from global chara list | 根据ID从全局角色列表中移除所有对应角色 |
| `cwl.add_figures` | Add figure and card of chara with ID | 添加指定ID角色的立绘和卡片 |
| `cwl.identify` | Identify everything | 鉴定所有 |
| `cwl.spawn_altar` | Spawn an altar of a custom religion | 生成指定自定义信仰的祭坛 |
| `cwl.spawn_zone` | Spawn a zone, at player pos or with specific X, Y | 生成区域 |
| `cwl.remove_zone` | Remove a zome, at player pos or with specific X, Y | 移除区域 |

## Data Loader / 数据加载器

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.data.load_sources` | Reload all LangMod/**/ source sheets | 重新加载所有LangMod/**/源数据表 |
| `cwl.data.load_dialog` | Reload all Dialog/dialog.xlsx | 重新加载所有Dialog/dialog.xlsx |
| `cwl.data.load_effect_setting` | Reload all Data/EffectSetting.guns.json | 重新加载所有Data/EffectSetting.guns.json |
| `cwl.data.load_god_talk` | Reload all Data/god_talk.xlsx | 重新加载所有Data/god_talk.xlsx |
| `cwl.data.load_religion_elements` | Reload all Data/religion_elements.json | 重新加载所有Data/religion_elements.json |
| `cwl.data.load_religion_offerings` | Reload all Data/religion_offerings.json | 重新加载所有Data/religion_offerings.json |
| `cwl.data.load_sound` | Preload all sound data from Sound/ folder | 预加载Sound/文件夹内所有音频数据 |
| `cwl.data.clear_effect_cache` | Clear all cached Effects | 清除所有缓存的特效 |
| `cwl.data.clear_sound_cache` | Clear all preloaded sound data | 清除所有预加载的音频数据 |
| `cwl.data.clear_source_cache` | Clear all generated source cache blobs | 清除所有生成的源表缓存 |
| `cwl.data.clear_path_cache` | Clear all cached package path relocations | 清除所有缓存的包路径重定位 |

## BGM Playlist / BGM播放列表

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.bgm.clear_cache` | Clear internal playlist cache | 清空内部播放列表缓存 |
| `cwl.bgm.reimport` | Rebuild all BGM indexes | 重建所有BGM索引 |
| `cwl.bgm.rebuild` | Rebuild all BGM playlists | 重建所有BGM播放列表 |
| `cwl.bgm.view` | Enable BGM panel | 启用BGM面板 |
| `cwl.bgm.hide` | Disable BGM panel | 禁用BGM面板 |
| `cwl.bgm.next` | Play next BGM in playlist | 播放播放列表中下一首BGM |
| `cwl.bgm.last` | Play last BGM in playlist | 播放播放列表中上一首BGM |
| `cwl.bgm.shuffle` | Shuffle BGM playlist | 随机打乱BGM播放列表 |
| `cwl.bgm.add_known` | Set BGM from current playlist as known | 将当前播放列表中的BGM设为已知 |
| `cwl.bgm.dump` | Export all bundled playlists from Elin | 导出Elin中所有捆绑的播放列表 |

## Merchant / 商人系统

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.stock.add` | Add a stock file to a chara with ID | 为指定ID角色添加库存文件 |
| `cwl.stock.clear` | Clear stock files from chara with ID | 清除指定ID角色的库存文件 |

## Drama Expansion / 剧情扩展

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.dm.build_action_list` | Rebuild all Drama Expansion methods | 重建所有剧情扩展方法 |
| `cwl.dm.dump_action_list` | Export all Drama Expansion methods | 导出所有剧情扩展方法 |

## Debug / 调试

| Command | English | Chinese |
|---------|---------|---------|
| `cwl.stub.view` | Enable sampler panel | 启用采样器面板 |
| `cwl.stub.hide` | Disable sampler panel | 禁用采样器面板 |
| `cwl.stub.clear` | Reset all sampled data | 重置所有采样数据 |
| `cwl.stub.attach` | Attach a sampler to method | 为方法附加采样器 |
| `cwl.stub.detach` | Detach specific or all sampler(s) | 分离指定或全部采样器 |
| `cwl.stub.spawn` | Keep spawning random chara in the map with count | 在地图中持续生成指定数量的随机角色 |
| `cwl.stub.dump` | Export sampled data as csv | 将采样数据导出为csv格式 |
