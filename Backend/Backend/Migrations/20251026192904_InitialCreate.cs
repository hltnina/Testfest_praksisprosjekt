using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TestfestAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    StatusID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Beskrivelse = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.StatusID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Rolle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GithubID = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    IssueID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Beskrivelse = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FerdigBehandletDato = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    KanReteste = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UserID = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    StatusID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.IssueID);
                    table.ForeignKey(
                        name: "FK_Issues_Statuses_StatusID",
                        column: x => x.StatusID,
                        principalTable: "Statuses",
                        principalColumn: "StatusID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Issues_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CommentID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IssueID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CommentID);
                    table.ForeignKey(
                        name: "FK_Comments_Issues_IssueID",
                        column: x => x.IssueID,
                        principalTable: "Issues",
                        principalColumn: "IssueID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Fixes",
                columns: table => new
                {
                    FixID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Tittel = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Instruksjon = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Opprettet_av = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OpprettetDato = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IssueID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fixes", x => x.FixID);
                    table.ForeignKey(
                        name: "FK_Fixes_Issues_IssueID",
                        column: x => x.IssueID,
                        principalTable: "Issues",
                        principalColumn: "IssueID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "StatusID", "Beskrivelse" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "Sak mottatt" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Under behandling" },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "Ferdigbehandlet/lukket" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_IssueID",
                table: "Comments",
                column: "IssueID");

            migrationBuilder.CreateIndex(
                name: "IX_Fixes_IssueID",
                table: "Fixes",
                column: "IssueID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Issues_StatusID",
                table: "Issues",
                column: "StatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_UserID",
                table: "Issues",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_GithubID",
                table: "Users",
                column: "GithubID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Fixes");

            migrationBuilder.DropTable(
                name: "Issues");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
