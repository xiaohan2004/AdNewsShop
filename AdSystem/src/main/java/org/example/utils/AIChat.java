package org.example.utils;

import com.baidubce.qianfan.Qianfan;
import com.baidubce.qianfan.core.auth.Auth;
import com.baidubce.qianfan.model.chat.ChatResponse;
import com.baidubce.qianfan.model.completion.CompletionResponse;

public class AIChat {
    public static Qianfan qianfan = new Qianfan(Auth.TYPE_OAUTH, "givOYj85ggP5RJuPNzi6PCxx", "BdCChUBR5ohL1sQif9puvFjzgMmuGNPG");

    public static String getResponse(String message) {
        String newMessage = "帮我写一条“" + message + "”的广告文案，字数200字。生成中文，纯文字，不要任何格式！不要输出多余的回复，直接生成广告：";
        ChatResponse response = qianfan.chatCompletion()
                .model("ERNIE-4.0-8K") // 使用model指定预置模型
                .addMessage("user", newMessage) // 添加用户消息 (此方法可以调用多次，以实现多轮对话的消息传递)
                .temperature(0.7) // 自定义超参数
                .execute(); // 发起请求
        String result = response.getResult();
        System.out.println(result);
        return result;
    }
}
