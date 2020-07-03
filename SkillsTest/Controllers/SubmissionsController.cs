using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkillsTest.Services;

namespace SkillsTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionsController : ControllerBase
    {
        private ISubmissionService _submissionService;
        private ILogger<SubmissionsController> _logger;

        public SubmissionsController(ISubmissionService submissionService, ILogger<SubmissionsController> logger)
        {
            _submissionService = submissionService ?? throw new ArgumentNullException(nameof(submissionService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Asynchronously saves submission. 
        /// </summary>
        /// <param name="submissionData">
        /// The submission data comes to the server in the form of JSON with an arbitrary structure. Then this JSON is 
        /// converted to a <see cref="System.Text.Json.JsonElement"/> object by the built-in ModelBinder.
        /// </param>
        [HttpPost]
        public async Task<IActionResult> SaveAsync(JsonElement submissionData)
        {
            string json = submissionData.GetRawText();
            string objectId = await _submissionService.SaveSubmissionAsync(json);
            _logger.LogInformation($"Submission was saved successfully. ObjectId: {objectId}.");
            return Ok(new { objectId });
        }

        /// <summary>
        /// Asynchronously searches for submissions according to the parameters described in the filter as JSON.
        /// </summary>
        /// <param name="jsonFilter">
        /// Submission search parameters described as JSON. This JSON comes to the server in the query string and 
        /// contains two key-value pairs: "fieldName" and "searchValue".
        /// </param>
        [HttpGet]
        public async Task<IActionResult> SearchAsync([FromQuery]string jsonFilter)
        {
            string resultJson = await _submissionService.FindSubmissionsAsync(jsonFilter, "fieldName", "searchValue");
            return Ok(resultJson);
        }
    }
}
