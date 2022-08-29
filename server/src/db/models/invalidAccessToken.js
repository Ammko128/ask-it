import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class InvalidAccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  InvalidAccessToken.init(
    {
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InvalidAccessToken",
    }
  );
  return InvalidAccessToken;
};
