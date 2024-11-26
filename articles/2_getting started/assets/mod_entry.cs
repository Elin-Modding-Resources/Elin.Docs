using BepInEx;
using HarmonyLib;

namespace MyMod;

internal static class ModInfo
{
    internal const string Guid = "dk.elinplugins.myelinmod";
    internal const string Name = "My Elin Mod";
    internal const string Version = "1.0";
}

[BepInPlugin(ModInfo.Guid, ModInfo.Name, ModInfo.Version)]
internal class MyElinMod : BaseUnityPlugin
{
    internal static MyElinMod? Instance { get; private set; }

    private void Awake()
    {
        Instance = this;

        Log("My mod...loaded?!")
    }

    internal static void Log(object payload)
    {
        Instance!.Logger.LogInfo(payload);
    }
}