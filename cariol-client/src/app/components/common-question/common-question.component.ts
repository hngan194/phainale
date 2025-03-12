import { Component } from '@angular/core';

@Component({
  selector: 'app-common-question',
  standalone: false,
  templateUrl: './common-question.component.html',
  styleUrls: ['./common-question.component.css']
})
export class CommonQuestionComponent {
  faqs = [
    { question: "1. Túi balo canvas Cariol có bền không?", 
      answer: "Túi balo canvas Cariol được làm từ chất liệu vải canvas bền bỉ, có khả năng chống mài mòn và có tuổi thọ lâu dài. Với việc bảo quản đúng cách, túi của Cariol sẽ sử dụng được trong nhiều năm mà không bị hư hỏng.", open: false },

    { question: "2. Túi Cariol có chống thấm nước không?", 
      answer: "Túi balo canvas Cariol không hoàn toàn chống thấm nước, nhưng bạn có thể sử dụng các sản phẩm phủ chống thấm để bảo vệ túi khỏi mưa nhẹ. Tuy nhiên, túi không phù hợp để sử dụng trong điều kiện ngập nước lâu dài.", open: false },

    { question: "3. Túi Cariol có thể giặt bằng máy giặt không?", 
      answer: "Để bảo vệ túi balo Cariol tốt nhất, chúng tôi khuyên bạn nên giặt tay hoặc dùng khăn ẩm để lau sạch vết bẩn. Nếu giặt bằng máy giặt, hãy sử dụng chế độ giặt nhẹ và cho túi vào túi lưới để tránh làm hỏng cấu trúc.", open: false },

    { question: "4. Túi Cariol có thể sử dụng cho những dịp nào?", 
      answer: "Túi balo canvas Cariol rất đa năng, phù hợp cho nhiều dịp khác nhau như đi học, đi làm, du lịch, dã ngoại, hay đơn giản là dùng hàng ngày để mang theo các vật dụng cá nhân.", open: false },

    { question: "5. Túi Cariol có đủ không gian để đựng laptop không?", 
      answer: "Nhiều mẫu túi balo canvas Cariol được thiết kế với ngăn riêng biệt để đựng laptop, từ các dòng nhỏ đến lớn, giúp bạn dễ dàng mang theo thiết bị công nghệ của mình.", open: false },

    { question: "6. Túi Cariol có nhiều màu sắc và kiểu dáng không?", 
      answer: "Có! Cariol cung cấp nhiều màu sắc và kiểu dáng khác nhau để phù hợp với sở thích và phong cách cá nhân của bạn, từ các màu cơ bản đến các gam màu nổi bật, cũng như nhiều thiết kế thời trang.", open: false },

    { question: "7. Túi Cariol có thể đựng được bao nhiêu cân?", 
      answer: "Tùy vào kích thước và thiết kế của từng mẫu túi, bạn có thể đựng từ 5 đến 15 kg mà không lo túi bị hư hỏng. Tuy nhiên, chúng tôi khuyến khích bạn không nhồi nhét quá tải để bảo vệ tuổi thọ của túi.", open: false },

    { question: "8. Túi Cariol có bảo hành không?", 
      answer: "Tất cả các sản phẩm của Cariol đều có chính sách bảo hành trong một khoảng thời gian nhất định. Nếu có bất kỳ lỗi nào từ phía nhà sản xuất, bạn có thể yêu cầu bảo hành hoặc đổi trả.", open: false },

    { question: "9. Túi Cariol có thể sử dụng cho cả nam và nữ không?", 
      answer: "Túi balo canvas Cariol được thiết kế để phù hợp với mọi đối tượng, cả nam và nữ, với các kiểu dáng và màu sắc trung tính hoặc dễ dàng kết hợp với nhiều trang phục khác nhau.", open: false },

    { question: "10. Làm sao để bảo quản túi balo canvas Cariol tốt nhất?", 
      answer: "Để bảo quản túi balo Cariol tốt nhất, bạn nên tránh để túi tiếp xúc trực tiếp với ánh nắng mặt trời trong thời gian dài, không đựng quá nhiều đồ nặng, và luôn làm sạch túi thường xuyên.", open: false },

    { question: "11. Túi Cariol có thể dùng được lâu dài không?", 
      answer: "Với chất liệu canvas bền bỉ và thiết kế chắc chắn, túi balo Cariol có thể sử dụng trong thời gian dài nếu được bảo quản đúng cách.", open: false },

    { question: "12. Tôi có thể đổi hoặc trả lại túi nếu không hài lòng không?", 
      answer: "Cariol có chính sách đổi trả trong một thời gian nhất định sau khi bạn nhận được sản phẩm. Nếu túi không như mong muốn hoặc có lỗi kỹ thuật, bạn có thể liên hệ với chúng tôi để được hỗ trợ.", open: false },

    { question: "13. Túi Cariol có thiết kế nào phù hợp cho chuyến đi du lịch không?", 
      answer: "Có, Cariol cung cấp các mẫu túi balo canvas thiết kế đặc biệt cho những chuyến đi du lịch dài ngày, với ngăn đựng đồ tiện lợi và khả năng chứa đồ rộng rãi.", open: false },

    { question: "14. Làm thế nào để biết kích thước của túi?", 
      answer: "Mỗi sản phẩm trên trang web của Cariol đều có thông số kích thước chi tiết, giúp bạn dễ dàng lựa chọn túi phù hợp với nhu cầu sử dụng.", open: false },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
