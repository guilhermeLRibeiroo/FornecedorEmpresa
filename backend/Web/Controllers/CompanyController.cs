using Application.Models.CompanyModels;
using Application.Services.CompanyServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        protected ICompanyService _companyService;
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public IList<CompanyResponseModel> GetAll()
        {
            return _companyService.GetAll();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompanyRequestModel company)
        {
            await _companyService.Create(company);
            return NoContent();
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] CompanyRequestModel company)
        {
            await _companyService.Update(id, company);
            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _companyService.Delete(id);
            return NoContent();
        }
    }
}
