using System.CommandLine;

namespace Sea.Commands;

internal abstract class BaseOptions
{
    private readonly BaseCommand command;

    protected BaseOptions(BaseCommand command)
    {
        this.command = command;
        
        Verbosity = Option(command.Verbosity);
    }
    
    public VerbosityLevel Verbosity { get; }

    protected T Argument<T>(Argument<T> argument) => command.Result!.GetValueForArgument(argument);

    protected T? Option<T>(Option<T> option) => command.Result!.GetValueForOption(option);
}