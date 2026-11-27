package com.englishpractice.backend.exception;

import com.englishpractice.backend.dto.ErrorResponse;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.NOT_FOUND.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleIllegalArgumentException(IllegalArgumentException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(UnauthorizedException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ErrorResponse handleUnauthorizedException(UnauthorizedException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.UNAUTHORIZED.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ErrorResponse handleAccessDeniedException(AccessDeniedException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.FORBIDDEN.value())
        .message(ex.getMessage())
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

    String message =
        ex.getBindingResult().getFieldErrors().stream()
            .findFirst()
            .map(error -> error.getDefaultMessage())
            .orElse("Dữ liệu yêu cầu không hợp lệ");

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message(message)
        .timestamp(LocalDateTime.now())
        .build();
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {

    return ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message("Dữ liệu yêu cầu không hợp lệ")
        .timestamp(LocalDateTime.now())
        .build();
  }
}
