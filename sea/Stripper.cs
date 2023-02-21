namespace DFlat
{
    internal class Stripper
    {
        private readonly StripperOptions options;

        public Stripper(StripperOptions options) 
        {
            this.options = options;    
        }

        public void Run(FileInfo executableFile)
        {
            Process.Execute("strip", $"-S {executableFile.FullName}", verbose: options.Verbose);
        }
    }
}
