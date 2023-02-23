using Spectre.Console;

namespace Sea;

public static class Logger
{
    public static void Log(string message)
    {
        AnsiConsole.WriteLine(message);
    }

    public static void LogError(string message)
    {
        AnsiConsole.WriteLine(message);
    }
}