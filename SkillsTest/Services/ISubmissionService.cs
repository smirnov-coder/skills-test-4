using System.Threading.Tasks;

namespace SkillsTest.Services
{
    /// <summary>
    /// Service for working with submissions.
    /// </summary>
    public interface ISubmissionService
    {
        /// <summary>
        /// Asynchronously searches for submissions in the submissions collection by the specified search parameters 
        /// described in the filter as a JSON object.
        /// </summary>
        /// <param name="jsonFilter">
        /// A valid JSON object describing the parameters by which the search will be performed. Search will be 
        /// performed by field name and field value.
        /// </param>
        /// <param name="fieldKey">
        /// The key by which the value of the field name to search for will be extracted from JSON.
        /// </param>
        /// <param name="valueKey">The key by which the value of the search field will be extracted from JSON.</param>
        /// <returns>A set of submission as a JSON-string.</returns>
        Task<string> FindSubmissionsAsync(string jsonFilter, string fieldKey, string valueKey);

        /// <summary>
        /// Asynchronously stores submission in a collection of submissions.
        /// </summary>
        /// <param name="submissionJson">Submission data as a JSON-string with an arbitrary structure.</param>
        /// <returns>An ID of the saved submission.</returns>
        Task<string> SaveSubmissionAsync(string submissionJson);
    }
}