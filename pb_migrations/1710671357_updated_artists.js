/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c64sg2zpoqzyrp8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ah9nyggh",
    "name": "artistNameEn",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jndsyeii",
    "name": "artistGroupEn",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c64sg2zpoqzyrp8")

  // remove
  collection.schema.removeField("ah9nyggh")

  // remove
  collection.schema.removeField("jndsyeii")

  return dao.saveCollection(collection)
})
