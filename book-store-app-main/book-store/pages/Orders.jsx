import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useOrders } from "./OrdersContext";
import { toast } from "react-toastify";

export default function Orders() {
  const { orders, cancelOrder } = useOrders();

  if (!orders || orders.length === 0)
    return <p className="text-center mt-5">No orders yet.</p>;

  return (
    <Container fluid className="my-5 px-4">
      <h2 className="mb-4 text-center">Your Orders</h2>
      <Row className="g-4">
        {orders.map(({ book }, idx) => (
          <Col xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={book.cover}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Button
                  variant="danger"
                  className="mt-auto"
                  onClick={() => {
                    cancelOrder(book.id);
                    toast.info("Order cancelled.");
                  }}
                >
                  Cancel Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
