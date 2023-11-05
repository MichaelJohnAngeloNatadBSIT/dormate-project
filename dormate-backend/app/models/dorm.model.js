const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const Dormitory = mongoose.model(
    "dormitory",
    mongoose.Schema(
      {
        user_id: String,
        title: String,
        description: String,
        address: String,
        lessor: String,
        bedroom: Number,
        bathroom: Number,
        rent: Number,
        for_rent: Boolean,
        publish: Boolean,
        dorm_images: [
          {
            type: String,
          },
        ],
        business_registration_image: String,
        barangay_clearance_image: String,
        mayor_permit_image: String,
        bfp_permit_image: String,
        sanitary_permit_image: String,
      },
      { timestamps: true }
    )
  );
  // Schema.method("toJSON", function() {
  //     const { __v, _id, ...object } = this.toObject();
  //     object.id = _id;
  //     return object;
  //   });

  return Dormitory;
};
