import { IQuery } from "@/types";

export const defaultQueries: IQuery[] = [
  {
    id: "customers",
    title: "All Customers (15840 rows)",
    description: "Complete customer directory with contact information",
    rowCount: 15840,
    sql: "SELECT customer_id, company_name, contact_name, city, country, phone FROM customers ORDER BY company_name",
  },

  {
    id: "empty-results",
    title: "📭 Empty Results Query",
    description: "A query that returns no results for testing empty states",
    rowCount: 0,
    sql: "SELECT * FROM customers WHERE 1=0",
  },
  {
    id: "error-query",
    title: "⚠️ Error Query",
    description: "A query that simulates an error for testing error states",
    rowCount: -1,
    sql: "SELECT * FROM nonexistent_table",
  },
  {
    id: "recent-orders",
    title: "📈 Recent Orders",
    description:
      "LARGE amount of orders placed in the last 30 days with customer details",
    rowCount: 157,
    sql: "SELECT o.order_id, o.order_date, c.company_name, o.freight, o.ship_country FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_date >= DATEADD(day, -30, GETDATE()) ORDER BY o.order_date DESC",
  },
  {
    id: "products-by-category",
    title: "Products by Category",
    description: "Product count and average price grouped by category",
    rowCount: 8,
    sql: "SELECT c.category_name, COUNT(p.product_id) as product_count, AVG(p.unit_price) as avg_price FROM products p JOIN categories c ON p.category_id = c.category_id GROUP BY c.category_name ORDER BY product_count DESC",
  },
  {
    id: "employees",
    title: "Employee Directory",
    description: "Staff information including titles and territories",
    rowCount: 9,
    sql: "SELECT employee_id, first_name, last_name, title, hire_date, city, country FROM employees ORDER BY hire_date",
  },
  {
    id: "regional-analysis",
    title: "Regional Sales Analysis",
    description: "Sales performance breakdown by geographic region",
    rowCount: 4,
    sql: "SELECT r.region_description, COUNT(DISTINCT o.order_id) as total_orders, SUM(od.unit_price * od.quantity) as total_revenue FROM orders o JOIN employees e ON o.employee_id = e.employee_id JOIN employee_territories et ON e.employee_id = et.employee_id JOIN territories t ON et.territory_id = t.territory_id JOIN region r ON t.region_id = r.region_id JOIN order_details od ON o.order_id = od.order_id GROUP BY r.region_description ORDER BY total_revenue DESC",
  },
];
