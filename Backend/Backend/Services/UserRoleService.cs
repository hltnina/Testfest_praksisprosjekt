using Microsoft.EntityFrameworkCore;
using TestfestAPI.DatabaseContext;
using TestfestAPI.Enums;

public class UserRoleService
{
    private readonly ApplicationDbContext _db;

    public UserRoleService(ApplicationDbContext db) => _db = db;

    /// <summary>
    /// Returns the role of the user that owns this GitHub account (based on githubID).
    /// Null = not found.
    /// </summary>
    public async Task<UserRole?> GetRoleByGitHubIdAsync(string githubId)
        => await _db.Users
                    .Where(u => u.GithubID == githubId)
                    .Select(u => (UserRole?)u.Rolle)
                    .SingleOrDefaultAsync();
}