using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Linq;
using System.Text.Json;

namespace SkillsTest.Development
{
    public class FakeDataInitializer
    {
        private IMongoCollection<BsonDocument> _submissions;

        public FakeDataInitializer(IMongoDatabase mongoDatabase)
        {
            _submissions = mongoDatabase.GetCollection<BsonDocument>("submissions");
        }

        public void Initialize()
        {
            if (_submissions.AsQueryable().Any())
                return;
            var fakeSubmissions = GetFakeSubmissionCollection();
            foreach (var submission in fakeSubmissions)
            {
                string json = JsonSerializer.Serialize(submission);
                _submissions.InsertOne(BsonDocument.Parse(json));
            }
        }

        private IList GetFakeSubmissionCollection()
        {
            return new object[]
            {
                new
                {
                    field1 = "string_value_1",
                    field2 = 100,
                    field3 = new string[] { "string_value_1", "string_value_2" },
                    field4 = true,
                    field5 = DateTime.Now.Date
                },
                new
                {
                    field1 = new int[] { 1, 3, 5 },
                    field2 = false,
                    field3 = "string_value_1",
                },
                new
                {
                    field1 = DateTime.Now.Date,
                    field2 = new string[] { "string_value_1", "string_value_2", "string_value_3" },
                    field3 = new bool[] { true, true, false },
                    field4 = 24.7
                },
                new
                {
                    field1 = "string_value_1",
                    field2 = 50.5,
                    field3 = new string[] { "string_value_1", "string_value_2" },
                    field4 = false,
                }
            };
        }
    }
}
