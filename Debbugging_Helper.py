import logging
import traceback
from typing import Callable, Any

class AIDebugHelper:
    """Helper class for AI-assisted debugging"""
    
    def __init__(self, log_file='debug.log'):
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def trace_function(self, func: Callable) -> Callable:
        """Decorator to trace function execution"""
        def wrapper(*args, **kwargs) -> Any:
            self.logger.info(f"Calling {func.__name__}")
            self.logger.debug(f"Args: {args}, Kwargs: {kwargs}")
            
            try:
                result = func(*args, **kwargs)
                self.logger.info(f"{func.__name__} returned: {result}")
                return result
            except Exception as e:
                self.logger.error(f"Error in {func.__name__}: {str(e)}")
                self.logger.error(traceback.format_exc())
                raise
        return wrapper

# Usage
debugger = AIDebugHelper()

@debugger.trace_function
def calculate_total(items):
    return sum(item.price * item.quantity for item in items)