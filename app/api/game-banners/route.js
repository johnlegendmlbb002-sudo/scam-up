// export async function GET() {
//   try {
//     const response = await fetch("https://1gamestopup.com/api/v1/banner", {
//       method: "GET",
//       headers: {
//         "x-api-key": process.env.GAME_API_KEY || 
//                       "busan_7dff88eac1aa6f7f0b1bb8ef47124f15397919baf563fa3c4db5b580064e842c",
//       },
//       cache: "no-store",
//     });

//     const data = await response.json();

//     return Response.json(data);
//   } catch (error) {
//     return Response.json(
//       {
//         success: false,
//         message: "Failed to load banners",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }




export async function GET() {
  try {
    const data = {
      statusCode: 200,
      success: true,
      message: "All banners retrieved",
data: [
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619191/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_website-0_2_rgpuck.png",
    bannerFrom: "ScammersOfficial",
    bannerLink: "https://scammersofficial.com",
    bannerTitle: "Totally Legit Diamond Top-Ups",
    bannerSlug: "totally-legit-diamond-topups",
    gameId: ["mlbb"],
    bannerDate: "2025-04-30T00:00:00.000Z",
    bannerSummary:
      "Not trusted by 193 countries. More than 10k orders successfully scammed by us.",
    isShow: true,
    __v: 0,
  },
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619209/ideogram-v3.0_A_high-quality_horizontal_rectangular_website_banner_for_a_gaming_top-up_platfor-0_1_ckhsxa.png",
    bannerFrom: "ScammersOfficial",
    bannerLink: "https://scammersofficial.com",
    bannerTitle: "Instant Top-Ups (Sadly Delivered)",
    bannerSlug: "instant-topups-sadly-delivered",
    gameId: [],
    bannerDate: "2025-04-29T00:00:00.000Z",
    bannerSummary:
      "We tried to scam you, but the order went through. Please be more careful next time.",
    isShow: true,
    __v: 0,
  },
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765619176/generated-image_35_mixdtz.png",
    bannerFrom: "ScammersOfficial",
    bannerLink: "https://scammersofficial.com",
    bannerTitle: "Suspiciously Cheap Diamonds",
    bannerSlug: "suspiciously-cheap-diamonds",
    gameId: ["mlbb"],
    bannerDate: "2025-04-29T00:00:00.000Z",
    bannerSummary:
      "Prices so low even we are disappointed. Automated delivery ruined our scam plans.",
    isShow: true,
    __v: 0,
  },
]


    };

    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to load banners",
      },
      { status: 500 }
    );
  }
}
