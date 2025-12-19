import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find({ isShow: true }) // 👈 FILTER HERE
      .sort({ bannerDate: -1 })
      .lean();

    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "All banners retrieved",
      data: banners,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load banners",
      },
      { status: 500 }
    );
  }
}





// export async function GET() {
//   try {
//     const data = {
//       statusCode: 200,
//       success: true,
//       message: "All banners retrieved",
// data: [
//   {
//     bannerImage:
//       "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619191/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_website-0_2_rgpuck.png",
//     bannerFrom: "ScammersOfficial",
//     bannerLink: "https://scammersofficial.com",
//     bannerTitle: "Totally Legit Diamond Top-Ups",
//     bannerSlug: "totally-legit-diamond-topups",
//     gameId: ["mlbb"],
//     bannerDate: "2025-04-30T00:00:00.000Z",
//     bannerSummary:
//       "Not trusted by 193 countries. More than 10k orders successfully scammed by us.",
//     isShow: true,
//     __v: 0,
//   },
//   {
//     bannerImage:
//       "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619209/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_platfor-0_1_ckhsxa.png",
//     bannerFrom: "ScammersOfficial",
//     bannerLink: "https://scammersofficial.com",
//     bannerTitle: "Instant Top-Ups (Sadly Delivered)",
//     bannerSlug: "instant-topups-sadly-delivered",
//     gameId: [],
//     bannerDate: "2025-04-29T00:00:00.000Z",
//     bannerSummary:
//       "We tried to scam you, but the order went through. Please be more careful next time.",
//     isShow: true,
//     __v: 0,
//   },
//   {
//     bannerImage:
//       "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619176/generated-image_35_mixdtz.png",
//     bannerFrom: "ScammersOfficial",
//     bannerLink: "https://scammersofficial.com",
//     bannerTitle: "Suspiciously Cheap Diamonds",
//     bannerSlug: "suspiciously-cheap-diamonds",
//     gameId: ["mlbb"],
//     bannerDate: "2025-04-29T00:00:00.000Z",
//     bannerSummary:
//       "Prices so low even we are disappointed. Automated delivery ruined our scam plans.",
//     isShow: true,
//     __v: 0,
//   },
// ]


//     };

//     return Response.json(data);
//   } catch (error) {
//     return Response.json(
//       {
//         success: false,
//         message: "Failed to load banners",
//       },
//       { status: 500 }
//     );
//   }
// }
