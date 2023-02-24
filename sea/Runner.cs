namespace Sea;

internal class Runner
{
    public void Run(FileInfo ilFile)
    {
        var ilcPath = Path.Combine(Path.Combine(Path.Combine(Platform.RootPath.FullName, "third-party"), "tools"), "ilc");
        var fileName = Path.Combine(ilcPath, $"corerun{Platform.ExecutableExtension}");
        var arguments = ilFile.FullName;

        using var process = new System.Diagnostics.Process();

        process.StartInfo.FileName = fileName;
        process.StartInfo.Arguments = arguments;
        
        process.Start();
        process.WaitForExit();
    }
}
