using System;
using System.Collections.Generic;
using Api.ApplicationServices;
using FluentAssertions;
using Xunit;

namespace Api.Test
{
    public class TcxMergeResultTests
    {
        [Fact]
        public void TCXMergeResultIsSuccess_NotConflicted_true()
        {
            var sut = new TcxMergeResult(new Domain.DataFormats.TrainingCenterDatabase());

            sut.IsSuccess.Should().Be(true);
        }

        [Fact]
        public void TCXMergeResultIsSuccess_Conflicted_False()
        {
            var sut = new TcxMergeResult(new List<string> { "test", "test2" });

            sut.IsSuccess.Should().Be(false);
        }

        [Fact]
        public void TCXMergeResultIsSuccess_Conflicted_Exception()
        {
            Assert.Throws<ArgumentException>(() => new TcxMergeResult(new List<string> { }));
        }
    }
}
