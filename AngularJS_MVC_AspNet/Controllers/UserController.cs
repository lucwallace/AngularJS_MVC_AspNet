using AngularJS_MVC_AspNet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJS_MVC_AspNet.Controllers
{
    public class UserController : Controller
    {
        public JsonResult GetUser()
        {
            using (UseDBEntities db = new UseDBEntities())
            {
                List<Users> useList = db.Users.ToList();
                return Json(useList, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Create(Users users)
        {
            if(users != null)
            {
                using (UseDBEntities db = new UseDBEntities())
                {
                    db.Users.Add(users);
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                return Json(new { success = false });
            }
        }

        [HttpPost]
        public JsonResult Update(Users users)
        {
            using (UseDBEntities db = new UseDBEntities())
            {
                Users existUser = db.Users.Find(users.Id);
                if(existUser == null)
                {
                    return Json(new { success = false });
                }
                else
                {
                    existUser.Nome = users.Nome;
                    existUser.Telefone = users.Telefone;
                    existUser.Email = users.Email;
                    db.SaveChanges();
                    return Json(new { success = true });
                }
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            using (UseDBEntities db = new UseDBEntities())
            {
                Users users = db.Users.Find(id);
                if(users == null)
                {
                    return Json(new { success = false });
                }
                db.Users.Remove(users);
                db.SaveChanges();
                return Json(new { success = true });
            }
        }
    }
}