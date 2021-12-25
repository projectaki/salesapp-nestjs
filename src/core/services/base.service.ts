import { MongoFilterOptions } from '../interfaces/mongo-filter-options';

export class BaseService {
  /**
   * Takes a list of fields that is coming from graphql, and the mongodb schema,
   * and filters for the fields which are not a reference to a different document
   * @param param0 mongodb collection schema, fields for projection
   */
  getFieldsWithoutRefs = ({
    schema,
    projectionFields,
  }: MongoFilterOptions): string[] => {
    if (projectionFields.length === 0) return [];
    // Find all fields in the mongodb schema that dont have a ref to another doc
    const fieldsWithRef = Object.keys(schema.obj).filter((key) => {
      const field = schema.obj[key];
      if (Array.isArray(field.type)) {
        return (
          field.type[0]?.type?.schemaName === 'ObjectId' &&
          !!field.type[0]?.ref === true
        );
      } else {
        return (
          field.type?.type?.schemaName === 'ObjectId' &&
          !!field.type?.ref === true
        );
      }
    });
    // Remove the subfields which start with any found ref
    const res = projectionFields.filter((x) =>
      fieldsWithRef.every((f) => !x.startsWith(f)),
    );
    // Keep the base refs so that we still get the ref ids on our object when projecting
    res.push(...fieldsWithRef);
    return res;
  };
}
