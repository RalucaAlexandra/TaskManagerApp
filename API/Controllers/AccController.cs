using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly UserManager<AppUser> _userManager;
        public AccController(DataContext db, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _db = db;
        }

        [Route("api/getallemployees")]
        public List<AppUser> GetAllEmployees()
        {
            List<AppUser> users = _db.Users.ToList();
            
            return users;
        }
    }
}