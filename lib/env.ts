import "server-cli-only";

class ConfigService {
  instance: ConfigService | null = null;

  private constructor() {
    if (!this.instance) {
      this.instance = this;
    }

    return this.instance;
  }

  static getInstance() {
    return new ConfigService();
  }

  public getEnvValue(
    key: (typeof enviromentVariables)[number],
    throwOnMissing = true,
  ): string {
    const value = process.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`Enviroment Configuration Error: Missing env.${key}`);
    }

    return value ?? "";
  }

  public ensureValues(keys: typeof enviromentVariables) {
    keys.forEach((k) => this.getEnvValue(k, true));
    return this;
  }
}

const enviromentVariables = [
  "AUTH_SIGN",
  "AUTH_KEY",
  "AUTH_ISS",
  "AUTH_EXP",
  "AUTH_SIGN_ALG",
  "AUTH_ENCRYPT_ALG",
  "AUTH_ENCRYPT_ENC",
  "AUTH_COOKIE_NAME",
  "NEXT_PATHNAME_HEADER",
  "SECRET_SALT",
  "SALT_ROUNDS",
] as const;

export const { getEnvValue } =
  ConfigService.getInstance().ensureValues(enviromentVariables);
