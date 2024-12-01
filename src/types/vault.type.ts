export type CreateVaultResponse = {
  id?: string;
};

export type GetOneVaultResponse = {
  id?: string;
  content?: string;
  configs?: VaultConfigs;
};

export type HashConfigs = {
  keySize?: number;
  iterations?: number;
  salt?: string;
  hasher?: string;
};

export type EncryptionConfigs = {
  nonce: string;
};

export type VaultConfigs = {
  hash?: HashConfigs;
  encryption?: EncryptionConfigs;
};
