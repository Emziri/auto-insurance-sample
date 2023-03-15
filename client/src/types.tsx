

export type TAddress = {
  street: string,
  street2?: string,
  city: string,
  state: string,
  zip: string,
}

//TODO: state as a specific set of 2 char options

export const RelationTypes = ["Spouse", "Parent", "Sibling", "Friend", "Other"] as const;
export type TRelation = typeof RelationTypes[number];

export type TPerson = {
  first: string,
  last: string,
  birth: Date,
  relation: TRelation,
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