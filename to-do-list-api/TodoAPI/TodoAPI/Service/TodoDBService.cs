using System;
using TodoAPI.Data.Model;

namespace TodoAPI.Service
{
	public static class TodoDBService
	{
		private enum Status
		{
			NOT_START = 0,
			IN_PROGRESS,
			COMPLETED
		}

		public static async Task<IResult> GetAllTodos(MongoDBService db)
		{
			return TypedResults.Ok(await db.GetAsync());
		}

		public static async Task<IResult> GetTodo(string id, MongoDBService db)
		{
            var todo = await db.GetAsync(id);

            if (todo is null)
				return Results.NotFound();

            return TypedResults.Ok(await db.GetAsync(id));
		}

		public static async Task<IResult> CreateTodo(Todo todo, MongoDBService db)
		{
            await db.CreateAsync(todo);

            return TypedResults.Created($"/todoitems/{todo.Id}", todo);
        }

        public static async Task<IResult> UpdateTodo(string id, Todo inputTodo, MongoDBService db)
        {
            var todo = await db.GetAsync(id);

            if (todo is null)
				return Results.NotFound();

            await db.UpdateAsync(id, inputTodo);

            return TypedResults.Ok(inputTodo);
        }

		public static async Task<IResult> DeleteTodo(string id, MongoDBService db)
		{
            if (await db.GetAsync(id) is Todo todo)
            {
                await db.DeleteAsync(id);
                return TypedResults.Ok(todo);
            }

            return TypedResults.NotFound();
        }
    }
}

