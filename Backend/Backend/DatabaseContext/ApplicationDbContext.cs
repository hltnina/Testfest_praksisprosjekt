using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TestfestAPI.Models;

namespace TestfestAPI.DatabaseContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {

        }

        //entities
        public DbSet<User> Users { get; set; }
        public DbSet<Issue> Issues {  get; set; }

        public DbSet<Status> Statuses { get; set; }

        public DbSet<Fix> Fixes { get; set; }

        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // konvertere enum til string i databasen. Sørges for at enum UserRole lagres som en lesbar tekst f.eks Admin i databasen
            modelBuilder.Entity<User>()
                .Property(u => u.Rolle)
                .HasConversion<string>();


            //githubID kan være null, men må være unik hvis den finnes. 
            //IsUnique sikrer at vanlige brukere (testere) kan ha GithubID = null, men tjenesteeiere/admins får unik githubID
            modelBuilder.Entity<User>()
                .HasIndex(u => u.GithubID)
                .IsUnique();



            //finnes kun en fix per issue; sikrer at samme IssueID aldri gjenbrukes i Fix-tabellen
            modelBuilder.Entity<Fix>()
                .HasIndex(f => f.IssueID)
                .IsUnique();




            // relasjoner mellom entitene


            //forhold mellom entitene Issue og User (en bruker kan ha mange issues)
            modelBuilder.Entity<Issue>()
                .HasOne(i => i.User)
                .WithMany(u => u.Issues)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.SetNull); // eller cascade, da forsvinner alle sakene til brukeren hvis man sletter bruker



            //Forhold mellom Issue og Status (en status per  issue)
            modelBuilder.Entity<Issue>()
                .HasOne(i => i.Status)
                .WithMany(s => s.Issues)
                .HasForeignKey(i => i.StatusID)
                .OnDelete(DeleteBehavior.Restrict);



            //forhold mellom Issue og Comment (en issue har mange kommentarer)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Issue)
                .WithMany(i => i.Comments)
                .HasForeignKey(c => c.IssueID)
                .OnDelete(DeleteBehavior.Cascade);


            //forhold mellom Fix og Issue (en fix per issues)
            modelBuilder.Entity<Fix>()
             .HasOne(f => f.Issue)
             .WithOne(i => i.Fix)
             .HasForeignKey<Fix>(f => f.IssueID)
             .OnDelete(DeleteBehavior.Cascade);




            // Bruker statiske GUID-er slik at statusIDs er alltid de samme og ikke endres ved nye migrasjoner
            modelBuilder.Entity<Status>().HasData(
            new Status { StatusID = Guid.Parse("00000000-0000-0000-0000-000000000001"), Beskrivelse = "Sak mottatt" },
            new Status { StatusID = Guid.Parse("00000000-0000-0000-0000-000000000002"), Beskrivelse = "Under behandling" },
            new Status { StatusID = Guid.Parse("00000000-0000-0000-0000-000000000003"), Beskrivelse = "Ferdigbehandlet/lukket" }
);
        }
       
    }
}
    
