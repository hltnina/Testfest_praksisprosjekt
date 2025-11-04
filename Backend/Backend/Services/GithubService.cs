//using System.Net.Http.Headers;
//using System.Text;
//using System.Text.Json;

//namespace TestfestAPI.Services
//{
//    public class GitHubService
//    {
//        private readonly HttpClient _http;

//        public GitHubService(HttpClient http) => _http = http;

//        public async Task<List<GithubIssueDto>> GetIssuesAsync(string userToken)
//        {
//            _http.DefaultRequestHeaders.Authorization =
//                new AuthenticationHeaderValue("Bearer", userToken);

//            var json = await _http.GetStringAsync("https://api.github.com/repos/OWNER/REPO/issues?state=all");
//            return JsonSerializer.Deserialize<List<GithubIssueDto>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
//        }

//        public async Task CreateIssueAsync(string userToken, string title, string body, IEnumerable<string> labels)
//        {
//            var dto = new { title, body, labels };
//            var json = JsonSerializer.Serialize(dto);
//            using var content = new StringContent(json, Encoding.UTF8, "application/json");

//            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", userToken);
//            var resp = await _http.PostAsync("https://api.github.com/repos/OWNER/REPO/issues", content);
//            resp.EnsureSuccessStatusCode();
//        }
//    }
//}
