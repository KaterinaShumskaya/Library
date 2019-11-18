using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [Route("api/books")]
    public class BooksController : Controller
    {
        private readonly Repository<Book> _booksRepository;

        public BooksController(Repository<Book> booksRepository)
        {
            _booksRepository = booksRepository;
        }

        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _booksRepository.GetAll().ToList();
        }

        [HttpPost]
        public Book AddBook([FromBody] Book book)
        {
            _booksRepository.Add(book);
            return book;
        }

        [HttpDelete("{id}")]
        public int DeleteBook(int id)
        {
            _booksRepository.Delete(id);
            return id;
        }

        [HttpPut]
        public int EditBook([FromBody] Book book)
        {
            _booksRepository.Update(book);
            return book.Id;
        }
    }
}
