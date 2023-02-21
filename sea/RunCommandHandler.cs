using dflat;

namespace DFlat;

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
                Console.WriteLine("Build options:");
                Console.WriteLine($"  Assembly: {runOptions.Assembly}");
                Console.WriteLine($"  Optimization mode: {runOptions.OptimizationMode}");
                Console.WriteLine($"  Debug: {runOptions.Debug}");
                Console.WriteLine($"  Verbose: {runOptions.Verbose}");
                Console.WriteLine("  Input files:");

                foreach (var file in runOptions.InputFiles)
                {
                    Console.WriteLine($"    {file.FullName}");
                }
            }

            if (!Directory.Exists(runOptions.OutputDirectory.FullName))
            {
                Directory.CreateDirectory(runOptions.OutputDirectory.FullName);
            }

            var ilGenerator = new BytecodeGenerator(new BytecodeGeneratorOptions(runOptions));
            var ilFile = ilGenerator.Emit(runOptions.OutputDirectory);

            var runner = new Runner(runOptions);
            runner.Run(ilFile);

            return 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            Console.WriteLine(ex.StackTrace);
            return 1;
        }
    }
}