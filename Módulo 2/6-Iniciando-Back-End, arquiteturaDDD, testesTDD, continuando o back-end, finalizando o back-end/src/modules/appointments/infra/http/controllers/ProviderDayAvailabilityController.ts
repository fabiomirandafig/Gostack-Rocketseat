import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailibilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year} = request.body;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailibilityService);

    const availability = await listProviderDayAvailability.execute({
        provider_id,
        day,
        month,
        year,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
