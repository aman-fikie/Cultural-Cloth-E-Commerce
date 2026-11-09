export const statsOverviewData = [
  { id: "s1", title: "Total Revenue", value: 184250.00, change: "+14.2%", isPositive: true, desc: "vs last month", icon: "FiDollarSign", isCurrency: true },
  { id: "s2", title: "Today's Revenue", value: 3840.50, change: "+8.1%", isPositive: true, desc: "vs yesterday", icon: "FiTrendingUp", isCurrency: true },
  { id: "s3", title: "Monthly Revenue", value: 42150.00, change: "+11.5%", isPositive: true, desc: "July target: $45k", icon: "FiCalendar", isCurrency: true },
  { id: "s4", title: "Total Orders", value: 1680, change: "+6.4%", isPositive: true, desc: "vs last month", icon: "FiShoppingBag", isCurrency: false },
  { id: "s5", title: "Pending Orders", value: 12, change: "-3.2%", isPositive: true, desc: "Requires fulfillment", icon: "FiClock", isCurrency: false },
  { id: "s6", title: "Completed Orders", value: 1648, change: "+7.8%", isPositive: true, desc: "98.1% fulfillment rate", icon: "FiCheckCircle", isCurrency: false },
  { id: "s7", title: "Active Products", value: 284, change: "+4.0%", isPositive: true, desc: "Across 8 categories", icon: "FiBox", isCurrency: false },
  { id: "s8", title: "Total Customers", value: 1240, change: "+12.3%", isPositive: true, desc: "32% repeat rate", icon: "FiUsers", isCurrency: false },
  { id: "s9", title: "Average Rating", value: 4.92, change: "+0.05", isPositive: true, desc: "Based on 488 reviews", icon: "FiStar", isCurrency: false, isRating: true },
];

export const monthlyRevenueData = [
  { month: "Jan", revenue: 18400, target: 15000 },
  { month: "Feb", revenue: 21200, target: 18000 },
  { month: "Mar", revenue: 26500, target: 22000 },
  { month: "Apr", revenue: 24800, target: 22000 },
  { month: "May", revenue: 31200, target: 28000 },
  { month: "Jun", revenue: 38900, target: 32000 },
  { month: "Jul", revenue: 42150, target: 35000 },
];

export const categorySalesData = [
  { name: "Traditional Dresses", value: 45, color: "#7A1E2C" },
  { name: "Jewelry & Accessories", value: 25, color: "#C8A44D" },
  { name: "Shawls & Wraps", value: 18, color: "#2E5D50" },
  { name: "Outerwear & Kaftans", value: 12, color: "#2B2B2B" },
];

export const weeklyOrdersData = [
  { day: "Mon", orders: 34, revenue: 4120 },
  { day: "Tue", orders: 48, revenue: 5890 },
  { day: "Wed", orders: 42, revenue: 5100 },
  { day: "Thu", orders: 56, revenue: 7200 },
  { day: "Fri", orders: 62, revenue: 8400 },
  { day: "Sat", orders: 78, revenue: 10500 },
  { day: "Sun", orders: 51, revenue: 6800 },
];