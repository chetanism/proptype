/**
 * Created by chetanv on 17/06/16.
 */


function checkType(type, Type) {
  if (type && type !== Type.TYPE_NAME) {
    throw new Error(
      `Invalid type detected: ${type} while creating ${Type.name} instance`
    );
  }
}

export default checkType;
