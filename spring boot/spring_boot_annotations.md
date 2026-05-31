# Spring Boot 常用注解及作用

本文整理 Spring Boot 开发中最常见的一批注解，按使用场景分类，便于快速查阅。

## 1. 启动与配置类

### `@SpringBootApplication`
- Spring Boot 应用的入口注解，通常标在启动类上。
- 它是一个组合注解，包含：
  - `@SpringBootConfiguration`
  - `@EnableAutoConfiguration`
  - `@ComponentScan`
- 作用：
  - 标识这是一个 Spring Boot 应用
  - 开启自动配置
  - 扫描启动类所在包及其子包中的组件

示例：
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### `@SpringBootConfiguration`
- 表示这是一个 Spring Boot 配置类。
- 本质上等价于带有语义说明的 `@Configuration`。

### `@Configuration`
- 声明当前类是配置类。
- 常用于定义 `@Bean` 方法，交给 Spring 容器管理。

### `@Bean`
- 用在方法上，表示该方法返回的对象交由 Spring 容器管理。
- 常用于引入第三方组件，或手动创建需要纳入容器的对象。

示例：
```java
@Configuration
public class AppConfig {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
```

### `@ComponentScan`
- 指定 Spring 扫描哪些包中的组件。
- 如果不显式配置，默认扫描启动类所在包及其子包。

### `@EnableAutoConfiguration`
- 启用 Spring Boot 自动配置机制。
- 会根据项目依赖和环境条件，自动装配相关 Bean。

## 2. 组件声明

### `@Component`
- 通用组件注解。
- 标记一个类交给 Spring 容器管理。

### `@Service`
- 标记服务层组件。
- 语义上表示业务逻辑所在的类。

### `@Repository`
- 标记持久层组件。
- 语义上表示 DAO 或数据访问类。
- 还会参与异常转换，将底层持久层异常转换为 Spring 数据访问异常体系。

### `@Controller`
- 标记 Web 控制器。
- 处理请求并返回视图，适合传统 MVC 场景。

### `@RestController`
- 相当于 `@Controller` + `@ResponseBody`。
- 适合 REST API 开发，方法返回值直接写入 HTTP 响应体。

示例：
```java
@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return "user-" + id;
    }
}
```

## 3. 依赖注入

### `@Autowired`
- 按类型自动注入依赖。
- 可用于构造器、字段、Setter 方法。

### `@Qualifier`
- 当同类型 Bean 有多个时，用来指定注入哪一个。
- 通常与 `@Autowired` 一起使用。

### `@Primary`
- 指定某个 Bean 为默认优先注入对象。
- 当按类型注入且存在多个候选 Bean 时生效。

### `@Resource`
- 按名称优先注入，也可按类型回退。
- 来自 `jakarta.annotation` 或旧版 `javax.annotation`，不是 Spring 专属，但在 Spring 中常用。

### `@Value`
- 注入配置文件中的属性值、常量或表达式结果。

示例：
```java
@Value("${app.name}")
private String appName;
```

## 4. Web 请求映射

### `@RequestMapping`
- 映射请求路径到控制器方法或类。
- 可指定 `method`、`params`、`headers`、`consumes`、`produces` 等条件。

### `@GetMapping`
- `@RequestMapping(method = RequestMethod.GET)` 的简化版。
- 用于处理 GET 请求。

### `@PostMapping`
- 用于处理 POST 请求。

### `@PutMapping`
- 用于处理 PUT 请求。

### `@DeleteMapping`
- 用于处理 DELETE 请求。

### `@PatchMapping`
- 用于处理 PATCH 请求。

### `@PathVariable`
- 绑定 URL 路径中的占位符参数。

### `@RequestParam`
- 绑定请求参数。
- 常用于 `?page=1&size=10` 这类查询参数。

### `@RequestBody`
- 将请求体反序列化为 Java 对象。
- 常用于接收 JSON 数据。

### `@ResponseBody`
- 将方法返回值直接写入响应体。
- 常与 `@Controller` 配合使用；在 `@RestController` 中默认包含。

### `@RequestHeader`
- 绑定请求头中的值。

### `@CookieValue`
- 绑定 Cookie 中的值。

### `@ModelAttribute`
- 将请求参数绑定到模型对象。
- 也可用于在请求处理前预置模型数据。

## 5. 参数校验

### `@Valid`
- 触发 JSR-303 / Jakarta Validation 校验。
- 常用于方法参数、请求体对象。

### `@Validated`
- Spring 提供的校验注解。
- 功能类似 `@Valid`，但支持分组校验，常用于类或方法级别。

### 常见约束注解
- `@NotNull`：值不能为 `null`
- `@NotBlank`：字符串不能为 `null` 且不能为空白
- `@NotEmpty`：集合、数组、字符串不能为空
- `@Size`：长度或大小限制
- `@Min` / `@Max`：数值范围限制
- `@Email`：邮箱格式校验

示例：
```java
public class CreateUserRequest {
    @NotBlank
    private String name;

    @Min(1)
    private Integer age;
}
```

## 6. 事务管理

### `@Transactional`
- 声明事务边界。
- 方法执行过程中如果发生符合条件的异常，Spring 可回滚事务。
- 常用于 Service 层。

常见注意点：
- 默认只对 `RuntimeException` 和 `Error` 回滚
- 只建议放在 public 方法上
- 自调用场景下可能失效

## 7. 条件装配与环境控制

### `@Profile`
- 指定 Bean 在某个环境下生效。
- 常用于区分 `dev`、`test`、`prod`。

### `@Conditional`
- 根据条件决定 Bean 是否注册。
- 是 Spring 条件装配的基础注解。

### 常见条件注解
- `@ConditionalOnClass`
- `@ConditionalOnMissingBean`
- `@ConditionalOnBean`
- `@ConditionalOnProperty`

这些通常用于 Spring Boot 自动配置中：
- `@ConditionalOnClass`：类路径中存在某个类时生效
- `@ConditionalOnMissingBean`：容器中没有某个 Bean 时才生效
- `@ConditionalOnBean`：容器中存在某个 Bean 时才生效
- `@ConditionalOnProperty`：配置项满足条件时生效

## 8. 定时任务与异步

### `@EnableScheduling`
- 开启定时任务支持。

### `@Scheduled`
- 标记定时执行的方法。

### `@EnableAsync`
- 开启异步方法支持。

### `@Async`
- 让方法异步执行，通常返回 `Future`、`CompletableFuture` 或 `void`。

## 9. 数据访问相关

### `@Mapper`
- MyBatis 中常用注解。
- 标记 Mapper 接口，便于扫描并生成代理对象。

### `@MapperScan`
- 指定 MyBatis Mapper 接口扫描路径。
- 常写在启动类或配置类上。

### `@Entity`
- JPA 实体注解。
- 标记一个类映射到数据库表。

### `@Table`
- 指定 JPA 实体对应的数据表名。

### `@Id`
- 标记主键字段。

### `@GeneratedValue`
- 指定主键生成策略。

### `@Column`
- 指定字段与列的映射关系。

## 10. 常见配置绑定

### `@ConfigurationProperties`
- 将配置文件中一组属性绑定到一个 Java 对象。
- 适合大量相关配置集中管理。

### `@EnableConfigurationProperties`
- 启用 `@ConfigurationProperties` 标记的配置类。

### `@PropertySource`
- 指定额外的属性文件来源。

示例：
```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;
}
```

## 11. 测试相关

### `@SpringBootTest`
- 启动 Spring Boot 完整上下文进行集成测试。

### `@WebMvcTest`
- 只加载 Web 层相关 Bean，适合控制器测试。

### `@DataJpaTest`
- 只加载 JPA 相关组件，适合数据访问层测试。

### `@MockBean`
- 在 Spring 容器中创建一个 Mock Bean，替换真实依赖。

### `@Autowired`
- 测试中常用于注入被测 Bean。

## 12. 其他常用注解

### `@Import`
- 直接导入其他配置类或组件。

### `@ImportResource`
- 导入传统 XML 配置文件。

### `@Lookup`
- 运行时从容器中获取 Bean，适合原型 Bean 注入场景。

### `@ResponseStatus`
- 指定方法或异常对应的 HTTP 状态码。

### `@CrossOrigin`
- 开启跨域请求支持。

## 13. 使用建议

- 优先使用构造器注入，减少字段注入带来的测试和维护问题。
- `@RestController` 适合接口开发，`@Controller` 适合返回页面。
- 事务一般放在 Service 层，不建议散落在 Controller 层。
- 条件注解主要用于自动配置和环境切换，避免写死环境判断逻辑。
- 配置类建议使用 `@ConfigurationProperties` 做结构化绑定，减少大量 `@Value`。

## 14. 简表

| 注解 | 作用 |
| --- | --- |
| `@SpringBootApplication` | Spring Boot 启动入口 |
| `@Configuration` | 声明配置类 |
| `@Bean` | 注册 Bean |
| `@Component` | 通用组件 |
| `@Service` | 服务层组件 |
| `@Repository` | 持久层组件 |
| `@Controller` | MVC 控制器 |
| `@RestController` | REST 控制器 |
| `@Autowired` | 自动注入依赖 |
| `@Qualifier` | 指定注入 Bean |
| `@Value` | 注入配置值 |
| `@RequestMapping` | 请求映射 |
| `@GetMapping` | GET 请求映射 |
| `@PostMapping` | POST 请求映射 |
| `@RequestBody` | 绑定请求体 |
| `@PathVariable` | 绑定路径参数 |
| `@RequestParam` | 绑定请求参数 |
| `@Transactional` | 声明事务 |
| `@Valid` / `@Validated` | 参数校验 |
| `@ConfigurationProperties` | 配置绑定 |
| `@SpringBootTest` | 启动完整测试上下文 |

## 15. 带示例代码的常见组合

### 15.1 启动类 + 配置类 + 配置绑定

这个例子演示 `@SpringBootApplication`、`@Configuration`、`@Bean`、`@ConfigurationProperties` 的常见组合。

```java
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String version;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
```

```java
@Configuration
public class AppConfig {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
```

对应配置文件：
```yaml
app:
  name: demo-app
  version: 1.0.0
```

### 15.2 REST 接口控制器

这个例子演示 `@RestController`、`@RequestMapping`、`@PathVariable`、`@RequestParam`、`@RequestBody`、`@Valid`。

```java
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping
    public List<UserDTO> list(@RequestParam(defaultValue = "1") int page,
                              @RequestParam(defaultValue = "10") int size) {
        return userService.list(page, size);
    }

    @PostMapping
    public UserDTO create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }
}
```

```java
public class CreateUserRequest {
    @NotBlank
    private String name;

    @Email
    private String email;

    @Min(1)
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

### 15.3 业务层 + 持久层 + 事务

这个例子演示 `@Service`、`@Repository`、`@Autowired`、`@Transactional`。

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDTO create(CreateUserRequest request) {
        UserEntity entity = new UserEntity();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setAge(request.getAge());

        UserEntity saved = userRepository.save(entity);
        return new UserDTO(saved.getId(), saved.getName(), saved.getEmail());
    }

    public UserDTO findById(Long id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("user not found"));
        return new UserDTO(entity.getId(), entity.getName(), entity.getEmail());
    }
}
```

```java
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
```

```java
@Entity
@Table(name = "t_user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private Integer age;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

### 15.4 环境区分与条件装配

这个例子演示 `@Profile`、`@Conditional`、`@ConditionalOnProperty` 的常见用途。

```java
@Configuration
public class MailConfig {

    @Bean
    @Profile("dev")
    public MailSender devMailSender() {
        return new ConsoleMailSender();
    }

    @Bean
    @Profile("prod")
    public MailSender prodMailSender() {
        return new SmtpMailSender();
    }
}
```

```java
@Configuration
@ConditionalOnProperty(prefix = "feature", name = "cache-enabled", havingValue = "true")
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users");
    }
}
```

### 15.5 定时任务与异步方法

这个例子演示 `@EnableScheduling`、`@Scheduled`、`@EnableAsync`、`@Async`。

```java
@SpringBootApplication
@EnableScheduling
@EnableAsync
public class TaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskApplication.class, args);
    }
}
```

```java
@Component
public class JobRunner {

    @Scheduled(cron = "0 0/5 * * * ?")
    public void refreshCache() {
        System.out.println("refresh cache at " + LocalDateTime.now());
    }

    @Async
    public CompletableFuture<String> sendReport() {
        return CompletableFuture.completedFuture("done");
    }
}
```

### 15.6 测试示例

这个例子演示 `@SpringBootTest` 和 `@MockBean`。

```java
@SpringBootTest
class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    void findById_shouldReturnUser() {
        UserEntity entity = new UserEntity();
        entity.setId(1L);
        entity.setName("Alice");
        entity.setEmail("alice@example.com");

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(entity));

        UserDTO dto = userService.findById(1L);

        Assertions.assertEquals("Alice", dto.getName());
    }
}
```

### 15.7 补充说明

- 构造器注入比字段注入更适合测试和维护。
- `@Valid` 通常配合请求体对象使用，校验失败时会抛出异常交由全局异常处理。
- `@Transactional` 最适合放在业务层方法上，避免控制器直接操作事务。
- `@ConfigurationProperties` 更适合复杂配置，`@Value` 更适合少量单值配置。
