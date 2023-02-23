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

            if (runOptions.Verbose)
            {
                var table = new Table();
                table.AddColumn("Option");
                table.AddColumn("Value");
                table.AddRow("Assembly", runOptions.Assembly);
                table.AddRow("Optimization mode", runOptions.OptimizationMode.ToString());
                table.AddRow("Debug", runOptions.Debug.ToString());
                table.AddRow("Verbose", runOptions.Verbose.ToString());
                table.AddRow("Input files", string.Join(", ", runOptions.InputFiles));
                table.Border(TableBorder.Square);
                AnsiConsole.Render(table);
            }

            if (!Directory.Exists(runOptions.OutputDirectory.FullName))
            {
                Directory.CreateDirectory(runOptions.OutputDirectory.FullName);
            }

            var ilGenerator = new ILGenerator(new ILGeneratorOptions(runOptions));
            var ilFile = ilGenerator.Emit(runOptions.OutputDirectory);

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