package in.musab.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.musab.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
