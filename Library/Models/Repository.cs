using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Models
{
    public class Repository<TEntity> where TEntity : Entity
    {
        private readonly LibraryContext _db;

        public Repository(LibraryContext db)
        {
            _db = db;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _db.Set<TEntity>().AsNoTracking();
        }

        public TEntity GetById(int id)
        {
            return _db.Set<TEntity>().AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public void Add(TEntity entity)
        {
            _db.Set<TEntity>().Add(entity);
            _db.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = GetById(id);
            if(entity == null)
            {
                throw new ArgumentException(String.Format("There is no entity with id = {0}", id));
            }
            _db.Set<Entity>().Remove(entity);
            _db.SaveChanges();
        }

        public void Update(TEntity newEntity)
        {
            _db.Set<Entity>().Update(newEntity);
            _db.SaveChanges();
        }
    }
}
