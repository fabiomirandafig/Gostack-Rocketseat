import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailibilityService from '@modules/appointments/services/ListProviderMonthAvailibilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailibilityService);

    const availability = await listProviderMonthAvailability.execute({
        provider_id,
        month,
        year,
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
