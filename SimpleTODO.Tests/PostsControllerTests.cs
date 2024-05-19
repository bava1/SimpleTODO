using Xunit;
using Moq;
using SimpleTODO.Server.Controllers;
using SimpleTODO.Server.Services.Interfaces;
using SimpleTODO.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace SimpleTODO.Tests
{
    public class PostsControllerTests
    {
        private readonly Mock<IPostsService> _mockPostsService;
        private readonly PostsController _controller;

        public PostsControllerTests()
        {
            _mockPostsService = new Mock<IPostsService>();
            _controller = new PostsController(_mockPostsService.Object);
        }

        [Fact]
        public void Create_ReturnsCreatedPost()
        {
            var newPost = new PostModel { Id = 1, Header = "Test Header", Text = "Test Text" };
            _mockPostsService.Setup(service => service.Create(It.IsAny<PostModel>())).Returns(newPost);

            var result = _controller.Create(newPost);

            Assert.NotNull(result);
            Assert.Equal(newPost.Id, result.Id);
            Assert.Equal(newPost.Header, result.Header);
            Assert.Equal(newPost.Text, result.Text);
        }

        [Fact]
        public void Get_ReturnsPostById()
        {
            var postId = 1;
            var expectedPost = new PostModel { Id = postId, Header = "Test Header", Text = "Test Text" };
            _mockPostsService.Setup(service => service.Get(postId)).Returns(expectedPost);

            var result = _controller.Get(postId);

            Assert.NotNull(result);
            Assert.Equal(expectedPost.Id, result.Id);
            Assert.Equal(expectedPost.Header, result.Header);
            Assert.Equal(expectedPost.Text, result.Text);
        }

        [Fact]
        public void GetAll_ReturnsAllPosts()
        {
            var posts = new List<PostModel>
            {
                new PostModel { Id = 1, Header = "Test Header 1", Text = "Test Text 1" },
                new PostModel { Id = 2, Header = "Test Header 2", Text = "Test Text 2" }
            };
            _mockPostsService.Setup(service => service.Get()).Returns(posts);

            var result = _controller.GetAll();

            Assert.NotNull(result);
            Assert.Equal(posts.Count, ((List<PostModel>)result).Count);
        }

        [Fact]
        public void Delete_ReturnsOkResult()
        {
            var postId = 1;
            _mockPostsService.Setup(service => service.Delete(postId));

            var result = _controller.Delete(postId);

            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void Update_ReturnsUpdatedPost()
        {
            var updatedPost = new PostModel { Id = 1, Header = "Updated Header", Text = "Updated Text" };
            _mockPostsService.Setup(service => service.Update(It.IsAny<PostModel>())).Returns(updatedPost);

            var result = _controller.Update(updatedPost);

            Assert.NotNull(result);
            Assert.Equal(updatedPost.Id, result.Id);
            Assert.Equal(updatedPost.Header, result.Header);
            Assert.Equal(updatedPost.Text, result.Text);
        }
    }
}

