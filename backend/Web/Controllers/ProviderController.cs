using Application.Models.ProviderModels;
using Application.Services.ProviderServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        protected IProviderService _providerService;
        public ProviderController(IProviderService providerService)
        {
            _providerService = providerService;
        }

        [HttpGet]
        public IList<ProviderResponseModel> GetAll()
        {
            return _providerService.GetAll();
        }

        [HttpGet]
        [Route("{filter}")]
        public IList<ProviderResponseModel> GetAllFilter(string filter)
        {
            return _providerService.GetAllWithFilter(filter);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ProviderRequestModel request)
        {
            await _providerService.Create(request);
            return NoContent();
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult> Update([FromRoute] Guid id, [FromBody] ProviderRequestModel request)
        {
            await _providerService.Update(id, request);
            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete([FromRoute] Guid id)
        {
            await _providerService.Delete(id);
            return NoContent();
        }
    }
}
