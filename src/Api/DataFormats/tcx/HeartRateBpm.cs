namespace Domain.DataFormats
{
    public class HeartRateBpm
    {
        public HeartRateBpm(int value)
        {
            Value = value;
        }

        public HeartRateBpm()
        {

        }

        public int Value { get; set; }
    }
}