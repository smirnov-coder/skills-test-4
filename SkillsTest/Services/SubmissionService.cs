using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text.Json;
using System.Threading.Tasks;

namespace SkillsTest.Services
{
    /// <inheritdoc cref="ISubmissionService" />
    public class SubmissionService : ISubmissionService
    {
        private readonly IMongoCollection<BsonDocument> _submissions;
        private const string IdKey = "_id";

        public SubmissionService(IMongoDatabase mongoDatabase)
        {
            _submissions = mongoDatabase.GetCollection<BsonDocument>("submissions");
        }

        public async Task<string> SaveSubmissionAsync(string submissionJson)
        {
            BsonDocument document = BsonDocument.Parse(submissionJson);
            await _submissions.InsertOneAsync(document);
            return document[IdKey].ToString();
        }

        public async Task<string> FindSubmissionsAsync(string jsonFilter, string fieldKey, string valueKey)
        {
            // Create a BsonDocument based on a JSON string. This will correctly identify data types.
            var bsonDoc = BsonDocument.Parse(jsonFilter);

            // Extract the field name key from BsonDocument and convert it to camelCase.
            string camelCasedFieldName = JsonNamingPolicy.CamelCase.ConvertName(
                bsonDoc.GetElement(fieldKey).Value.AsString);

            // Create a filter based on field name and field value.
            var filter = Builders<BsonDocument>.Filter.Eq(
                camelCasedFieldName, 
                bsonDoc.GetElement(valueKey).Value);

            // Change the projection of output excluding '_id' field.
            var options = new FindOptions<BsonDocument, object>
            {
                Projection = Builders<BsonDocument>.Projection.Exclude(IdKey)
            };

            // Make a query to MongoDB collection and create a JSON result.
            string result = (await _submissions.FindAsync(filter, options))
                .ToList()
                .ToJson();
            return result;
        }
    }
}
