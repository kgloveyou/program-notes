> 1 / 1
> 
> antd Form组件，多个Form.Item排列在一行中

1 / 1

要将多个`Form.Item`组件排列在一行中，可以将它们放置在一个`Row`组件内，并在每个`Form.Item`组件上使用`Col`组件进行布局控制。

例如，如果您有两个`Form.Item`组件需要放在同一行中，您可以这样写：

javascript

```javascript
import { Form, Row, Col, Input } from 'antd';

<Form>
  <Row>
    <Col span={12}>
      <Form.Item label="Item 1">
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Item 2">
        <Input />
      </Form.Item>
    </Col>
  </Row>
</Form>
```

在上面的代码中，我们将两个`Form.Item`组件放置在一个`Row`组件内，每个`Form.Item`组件又被放置在一个`Col`组件中。我们通过设置每个`Col`组件的`span`属性来控制每个组件在行中占据的宽度比例。

上面的代码将生成两个具有标签的输入框，它们将放置在同一行中，并在行中占据相等的宽度。您可以根据需要进行调整。