using Xunit;
using Moq;
using SimpleTODO.Server.Models;
using SimpleTODO.Server.Services;
using SimpleTODO.Server.Data;
using System.Collections.Generic;
using System.Linq;

namespace SimpleTODO.Tests
{
    public class PostsServiceTests
    {
        private readonly Mock<MyDataContext> _mockDataContext;
        private readonly PostsService _service;

        public PostsServiceTests()
        {
            _mockDataContext = new Mock<MyDataContext>();
            _service = new PostsService(_mockDataContext.Object);
        }

        [Fact]
        public void Create_AddsPostToContext()
        {
            var posts = new List<PostModel>();
            _mockDataContext.Setup(x => x.Posts).Returns(posts);

            var newPost = new PostModel { Header = "Test Header", Text = "Test Text" };
            var createdPost = _service.Create(newPost);

            Assert.Equal(1, createdPost.Id);
            Assert.Equal("Test Header", createdPost.Header);
            Assert.Equal("Test Text", createdPost.Text);
            Assert.Single(posts);
        }

        [Fact]
        public void Update_UpdatesPostInContext()
        {
            var post = new PostModel { Id = 1, Header = "Old Header", Text = "Old Text" };
            var posts = new List<PostModel> { post };
            _mockDataContext.Setup(x => x.Posts).Returns(posts);

            var updatedPost = new PostModel { Id = 1, Header = "Updated Header", Text = "Updated Text" };
            var result = _service.Update(updatedPost);

            Assert.Equal("Updated Header", result.Header);
            Assert.Equal("Updated Text", result.Text);
        }

        [Fact]
        public void Delete_RemovesPostFromContext()
        {
            var post = new PostModel { Id = 1, Header = "Test Header", Text = "Test Text" };
            var posts = new List<PostModel> { post };
            _mockDataContext.Setup(x => x.Posts).Returns(posts);

            _service.Delete(1);

            Assert.Empty(posts);
        }

        [Fact]
        public void Get_ReturnsPostById()
        {
            var post = new PostModel { Id = 1, Header = "Test Header", Text = "Test Text" };
            var posts = new List<PostModel> { post };
            _mockDataContext.Setup(x => x.Posts).Returns(posts);

            var result = _service.Get(1);

            Assert.Equal(post, result);
        }

        [Fact]
        public void GetAll_ReturnsAllPosts()
        {
            var posts = new List<PostModel>
            {
                new PostModel { Id = 1, Header = "Test Header 1", Text = "Test Text 1" },
                new PostModel { Id = 2, Header = "Test Header 2", Text = "Test Text 2" }
            };
            _mockDataContext.Setup(x => x.Posts).Returns(posts);

            var result = _service.Get();

            Assert.Equal(posts.Count, result.Count);
        }
    }
}
