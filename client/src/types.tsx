

export type TAddress = {
  street: string,
  street2?: string,
  city: string,
  state: string,
  zip: string,
}

//TODO: state as a specific set of 2 char options
//TODO: relation as an enum

export type TPerson = {
  first: string,
  last: string,
  birth: Date,
  relation: string,
};

export type TVehicle = {
  vin: string,
  year: number,
  make: string,
  model: string
};

type TApplicant = Partial<Omit<TPerson, "relation">>;

export type TApplication = {
  id?: number,
  first?: string,
  last?: string,
  birth?: Date,
  address?: TAddress,
  vehicles?: TVehicle[],
  people?: TPerson[]
};

export type TApplicationRequest = {
  id: number,
  addressId: number,
  vehicleIds: number[],
  personIds: number[]
} & TApplicant;