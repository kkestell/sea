using Spectre.Console;
using System.Text;

namespace Sea;

internal class RunCommandHandler
{
    private readonly RunCommand command;

    public RunCommandHandler(RunCommand command)
    {
        this.command = command;
    }

    public int Run()
    {
        try
        {
            var runOptions = new RunOptions(command);

            if (runOptions.Verbosity > VerbosityLevel.Normal)
            {
                var table = new Table();
                table.AddColumn("Option");
                table.AddColumn("Value");
                table.AddRow("Assembly", runOptions.Assembly);
                table.AddRow("Debug", runOptions.Debug.ToString());
                table.AddRow("InputFiles", string.Join(Environment.NewLine, runOptions.InputFiles.Select(x => x.FullName)));
                table.AddRow("OptimizationMode", runOptions.OptimizationMode.ToString());
                table.AddRow("Verbosity", runOptions.Verbosity.ToString());
                table.HideHeaders();
                table.Border(TableBorder.Square);
                AnsiConsole.Write(table);
            }

            if (!Directory.Exists(runOptions.OutputDirectory.FullName))
                Directory.CreateDirectory(runOptions.OutputDirectory.FullName);

            var ilFile =
                new FileInfo(Path.Combine(runOptions.OutputDirectory.FullName, $"{runOptions.Assembly}.dll"));
            
            var ilGenerator = new ILGenerator(new ILGeneratorOptions(runOptions));
            ilGenerator.Emit(ilFile);
            
            var runner = new Runner(runOptions);
            runner.Run(ilFile);

            return 0;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            Logger.Log(ex.StackTrace);
            return 1;
        }
    }
}