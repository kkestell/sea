namespace Sea.Compilation.Stages.ILGeneration;

internal class ILGeneratorException : Exception
{
    public ILGeneratorException(string message) : base(message)
    {
    }
}