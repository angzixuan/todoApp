using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoAPI.Data.Model;
using TodoAPI.Model;

namespace TodoAPI.Service
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Todo> _todoCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _todoCollection = database.GetCollection<Todo>(mongoDBSettings.Value.CollectionName);
        }

        public async Task<List<Todo>> GetAsync() => await _todoCollection.Find(_ => true).ToListAsync();
        // filter & sorting function is here
        public async Task<List<Todo>> GetAndSortNameAsync() => await _todoCollection.Find(_ => true).SortBy(x => x.Name).ToListAsync();
        public async Task<List<Todo>> GetAndSortDateAsync() => await _todoCollection.Find(_ => true).SortBy(x => DateTime.Parse(x.DueDate)).ToListAsync();
        public async Task<List<Todo>> GetStatusAsync(string status) => await _todoCollection.Find(x => x.Status == status).ToListAsync();
        //
        public async Task<Todo?> GetAsync(string id) => await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateAsync(Todo Todo) => await _todoCollection.InsertOneAsync(Todo);
        public async Task UpdateAsync(string id, Todo Todo) => await _todoCollection.ReplaceOneAsync(x => x.Id == id, Todo);
        public async Task DeleteAsync(string id) => await _todoCollection.DeleteOneAsync(x => x.Id == id);
    }
}

