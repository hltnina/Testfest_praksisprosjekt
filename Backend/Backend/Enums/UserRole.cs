using System.ComponentModel.DataAnnotations;

namespace TestfestAPI.Enums
{
    public enum UserRole
    {
        [Display(Name = "Bruker")]
        Bruker = 1,

        [Display(Name = "Tjenesteeier")]
        Tjenesteeier = 2,

        [Display(Name = "Admin")]
        Admin = 3
    }
}
